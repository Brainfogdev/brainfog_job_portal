"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  checkVerificationStatus,
  resetVerificationState,
} from "@/lib/redux/features/verify/VerifySlice";
import { Loader, AlertCircle, CircleCheck } from "lucide-react";

import ShortlistedStatus from "@/components/verify/ShortlistedStatus";

export default function VerifyFlow() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { verificationStatus, isShortlisted, jobTitle, verificationError } =
    useSelector((state) => state.verify);

  // These are correctly extracted and used to trigger the effect
  const email = searchParams.get("email");
  const jobId = searchParams.get("job");

  useEffect(() => {
    if (email && jobId && verificationStatus === "idle") {
      dispatch(checkVerificationStatus({ jobId, email }));
    }
    // Cleanup is implicitly handled by the page component unmounting
  }, [dispatch, email, jobId, verificationStatus]);

  // State 1: Loading
  if (verificationStatus === "loading" || verificationStatus === "idle") {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm">
        <Loader className="animate-spin text-orange-500 w-12 h-12" />
        <p className="mt-4 font-semibold text-gray-700">
          Verifying your application status...
        </p>
      </div>
    );
  }

  // State 2: Verification Failed
  if (verificationStatus === "failed") {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 text-red-700 rounded-2xl shadow-sm">
        <AlertCircle className="w-12 h-12" />
        <p className="mt-4 font-semibold">Verification Failed</p>
        <p className="mt-1 text-sm text-center">
          {verificationError ||
            "An unknown error occurred. Please check the link and try again."}
        </p>
      </div>
    );
  }

  // State 3: Succeeded and Shortlisted
  if (verificationStatus === "succeeded" && isShortlisted) {
    return <ShortlistedStatus jobTitle={jobTitle} />;
  }

  // State 4: Succeeded but Not Shortlisted
  if (verificationStatus === "succeeded" && !isShortlisted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-blue-50 text-blue-800 rounded-2xl shadow-sm">
        <CircleCheck className="w-12 h-12" />
        <p className="mt-4 text-xl font-semibold">
          Status Update for: {jobTitle}
        </p>
        <p className="mt-1 text-sm text-center text-green-600">
          Your Interview is Scheduled.
        </p>
      </div>
    );
  }

  return null; // Default case
}
