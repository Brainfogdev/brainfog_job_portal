import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Assuming API_BASE_URL is your common API prefix, e.g., '/api'
import { API_BASE_URL } from "@/constants/api";

// --- Async Thunks ---

// checkVerificationStatus remains the same, assuming it's working as intended.
export const checkVerificationStatus = createAsyncThunk(
  "verify/checkStatus",
  async ({ jobId, email }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/applications/status/${email}`,
        {
          method: "GET",
          headers: { "ngrok-skip-browser-warning": "1" },
        }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        return rejectWithValue(result.message || "Failed to retrieve status.");
      }
      const targetApplication = result.data.find(
        (app) => String(app.job.id) === String(jobId)
      );
      if (!targetApplication) {
        return rejectWithValue(
          "An application for this specific job was not found."
        );
      }
      const isShortlisted =
        targetApplication.status === "shortlisted" ||
        targetApplication.status === "interview_scheduled";
      const jobTitle = targetApplication.job.title;
      return { isShortlisted, jobTitle, email, jobId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch available and booked interview slots
export const fetchInterviewSlots = createAsyncThunk(
  "verify/fetchSlots",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/slots/job/${jobId}`, {
        headers: { "ngrok-skip-browser-warning": "1" },
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        return rejectWithValue(result.message || "Could not fetch slots.");
      }
      // FIX: Grab the 'allSlots' array from the data object.
      // This contains both booked and available slots, each with an 'isBooked' flag.
      if (result.data && Array.isArray(result.data.allSlots)) {
        return result.data.allSlots;
      }
      return []; // Return empty array if the shape is unexpected
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// bookInterviewSlot remains the same, using the new schema.
export const bookInterviewSlot = createAsyncThunk(
  "verify/bookSlot",
  async ({ jobId, bookingData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/slots/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        return rejectWithValue(result.message || "Could not book the slot.");
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slice Definition (No changes needed here) ---
const initialState = {
  verificationStatus: "idle",
  isShortlisted: false,
  jobId: null,
  email: null,
  jobTitle: "",
  verificationError: null,
  slots: [],
  slotsStatus: "idle",
  slotsError: null,
  bookingStatus: "idle",
  bookingError: null,
};

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetVerificationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkVerificationStatus.pending, (state) => {
        state.verificationStatus = "loading";
        state.verificationError = null;
      })
      .addCase(checkVerificationStatus.fulfilled, (state, action) => {
        state.verificationStatus = "succeeded";
        state.isShortlisted = action.payload.isShortlisted;
        state.jobId = action.payload.jobId;
        state.email = action.payload.email;
        state.jobTitle = action.payload.jobTitle;
      })
      .addCase(checkVerificationStatus.rejected, (state, action) => {
        state.verificationStatus = "failed";
        state.verificationError = action.payload;
        state.isShortlisted = false;
      })
      // Reducers for other thunks remain unchanged
      .addCase(fetchInterviewSlots.pending, (state) => {
        state.slotsStatus = "loading";
        state.slotsError = null;
      })
      .addCase(fetchInterviewSlots.fulfilled, (state, action) => {
        state.slotsStatus = "succeeded";
        state.slots = action.payload;
      })
      .addCase(fetchInterviewSlots.rejected, (state, action) => {
        state.slotsStatus = "failed";
        state.slotsError = action.payload;
      })
      .addCase(bookInterviewSlot.pending, (state) => {
        state.bookingStatus = "loading";
        state.bookingError = null;
      })
      .addCase(bookInterviewSlot.fulfilled, (state) => {
        state.bookingStatus = "succeeded";
      })
      .addCase(bookInterviewSlot.rejected, (state, action) => {
        state.bookingStatus = "failed";
        state.bookingError = action.payload;
      });
  },
});

export const { resetVerificationState } = verifySlice.actions;
export default verifySlice.reducer;
