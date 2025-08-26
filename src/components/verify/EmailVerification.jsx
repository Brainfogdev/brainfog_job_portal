"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkVerificationStatus } from "@/lib/redux/features/verify/VerifySlice";
import { AlertCircle } from "lucide-react";

export default function EmailVerification({ emailFromQuery, jobIdFromQuery }) {
  const dispatch = useDispatch();

  // Select state needed for displaying feedback within this component
  const { verificationStatus, verificationError, isShortlisted, jobTitle } =
    useSelector((state) => state.verify);

  // Local state for the email input
  const [email, setEmail] = useState("");
  // Local state for client-side errors (e.g., missing Job ID)
  const [clientError, setClientError] = useState("");

  // Auto-fill the email from the URL parameter when the component loads
  useEffect(() => {
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [emailFromQuery]);

  const handleCheckStatus = (e) => {
    e.preventDefault();
    setClientError(""); // Clear previous errors

    // Client-side validation
    if (!jobIdFromQuery) {
      setClientError(
        "Job ID is missing from URL. Please use the link provided."
      );
      return;
    }
    if (!email.trim()) {
      setClientError("Please enter your email address to verify.");
      return;
    }

    // Dispatch the verification thunk
    dispatch(checkVerificationStatus({ jobId: jobIdFromQuery, email }));
  };

  const isLoading = verificationStatus === "loading";

  // --- Render different feedback messages based on the verification status ---

  // API returned an error
  const renderError = verificationStatus === "failed" && (
    <div className="mt-4 flex items-center gap-3 bg-red-50 text-red-700 p-3 rounded-lg">
      <AlertCircle size={20} />
      <p>{verificationError}</p>
    </div>
  );

  // Succeeded but user was NOT shortlisted
  const renderNotShortlisted = verificationStatus === "succeeded" &&
    !isShortlisted && (
      <div className="mt-4 bg-blue-50 text-blue-800 p-3 rounded-lg">
        <p className="font-semibold">Status Update for: {jobTitle}</p>
        <p>
          Thank you for your application. After careful consideration, you were
          not shortlisted for this role.
        </p>
      </div>
    );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Verify Your Application Status
      </h2>
      <p className="text-gray-600 mb-6">
        Enter the email you used to apply. We'll check if you've been
        shortlisted.
      </p>

      <form onSubmit={handleCheckStatus}>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
            readOnly={!!emailFromQuery} // Makes the input read-only if pre-filled from URL
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Checking..." : "Check Status"}
          </button>
        </div>
      </form>

      {/* Render feedback messages here */}
      {clientError && <p className="text-red-600 mt-4">{clientError}</p>}
      {renderError}
      {renderNotShortlisted}
    </div>
  );
}
