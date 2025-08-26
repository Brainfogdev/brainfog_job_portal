import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./features/job/JobSlice";
import verifyReducer from "./features/verify/VerifySlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    verify: verifyReducer,
  },
});
