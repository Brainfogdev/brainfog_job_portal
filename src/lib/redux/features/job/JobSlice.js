// JobSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "@/constants/api";

// ... (fetchJobs thunk remains the same) ...
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "1",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        return rejectWithValue(result.message || "Failed to fetch jobs.");
      }
      if (!result.success) {
        return rejectWithValue(result.message || "An API error occurred.");
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// NEW: Async thunk to check for an existing application by email
export const checkExistingApplication = createAsyncThunk(
  "jobs/checkExistingApplication",
  async ({ jobId, email }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/applications/${jobId}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        }
      );
      const result = await response.json();

      if (!response.ok) {
        // It's okay if it fails (e.g., 404 if no applications yet), we'll treat it as "not applied"
        return { alreadyApplied: false };
      }
      if (result.success && Array.isArray(result.data)) {
        const existingApplication = result.data.find(
          (app) => app.email.toLowerCase() === email.toLowerCase()
        );
        if (existingApplication) {
          return { alreadyApplied: true };
        }
      }
      return { alreadyApplied: false };
    } catch (error) {
      // Also treat network errors as "not applied" for a smoother user experience
      return { alreadyApplied: false };
    }
  }
);

// Async thunk to submit an application
export const submitApplication = createAsyncThunk(
  "jobs/submitApplication",
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: "POST",
        body: applicationData, // applicationData is the FormData object
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        return rejectWithValue(
          result.message || "Failed to submit application."
        );
      }

      return result; // On success, return the successful response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    status: "idle",
    error: null,
    applicationStatus: "idle",
    applicationError: null,
    // NEW: State for the email check
    emailCheckStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    resetApplicationStatus: (state) => {
      state.applicationStatus = "idle";
      state.applicationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(submitApplication.pending, (state) => {
        state.applicationStatus = "loading";
        state.applicationError = null;
      })
      .addCase(submitApplication.fulfilled, (state) => {
        state.applicationStatus = "succeeded";
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.applicationStatus = "failed";
        state.applicationError = action.payload;
      })
      // NEW: Reducers for checkExistingApplication
      .addCase(checkExistingApplication.pending, (state) => {
        state.emailCheckStatus = "loading";
      })
      .addCase(checkExistingApplication.fulfilled, (state) => {
        state.emailCheckStatus = "succeeded";
      })
      .addCase(checkExistingApplication.rejected, (state) => {
        state.emailCheckStatus = "failed";
      });
  },
});

export const { resetApplicationStatus } = jobsSlice.actions;

export default jobsSlice.reducer;
