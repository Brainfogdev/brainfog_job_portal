"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitApplication,
  resetApplicationStatus,
  checkExistingApplication,
} from "@/lib/redux/features/job/JobSlice";
import { debounce } from "lodash";

export default function ApplicationForm({ job }) {
  const dispatch = useDispatch();
  // Destructure the new emailCheckStatus from the state
  const { applicationStatus, applicationError, emailCheckStatus } = useSelector(
    (state) => state.jobs
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resume, setResume] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formError, setFormError] = useState("");
  // Add state to track if the email has already been used
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetApplicationStatus());
    };
  }, [dispatch]);

  // Create a debounced function to check the email
  const debouncedEmailCheck = useCallback(
    debounce((emailValue) => {
      if (emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        dispatch(checkExistingApplication({ jobId: job.id, email: emailValue }))
          .unwrap()
          .then((result) => {
            setAlreadyApplied(result.alreadyApplied);
          });
      } else {
        setAlreadyApplied(false);
      }
    }, 1000), // 500ms delay
    [dispatch, job.id]
  );

  // Handle email input changes
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    debouncedEmailCheck(value);
  };

  function toggleSkill(skill) {
    setSelectedSkills((s) =>
      s.includes(skill) ? s.filter((x) => x !== skill) : [...s, skill]
    );
  }

  function handleFile(e) {
    setResume(e.target.files[0] || null);
  }

  async function submit(e) {
    e.preventDefault();
    setFormError("");

    // Prevent submission if the email has already been used
    if (alreadyApplied) {
      setFormError("This email has already been used to apply for this job.");
      return;
    }

    if (!name || !email || !resume) {
      setFormError("Please fill out your Name, Email, and upload a Resume.");
      return;
    }
    if (selectedSkills.length === 0) {
      setFormError("Please select at least one skill.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", job.id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("userSkills", JSON.stringify(selectedSkills));

    if (linkedIn) formData.append("linkedin", linkedIn);
    if (portfolio) formData.append("portfolio", portfolio);

    dispatch(submitApplication(formData));
  }

  if (applicationStatus === "succeeded") {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 text-center shadow-lg">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-7 h-7 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-emerald-800 mb-1">
          Application Submitted!
        </h3>
        <p className="text-emerald-700 leading-relaxed text-sm">
          Thank you for applying to this position. We've received your
          application and will review it carefully. You'll hear from us within
          the next few business days.
        </p>
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Loading Overlay */}
      {applicationStatus === "loading" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="mt-3 text-xs font-medium text-gray-600">
            Submitting your application...
          </p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={submit}
        className={`bg-white shadow-2xl rounded-2xl p-5 md:p-7 space-y-5 border border-gray-100 transition-all duration-300 ${
          applicationStatus === "loading" ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Header */}
        <div className="text-center pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Apply for this Position
          </h2>
          <p className="text-gray-600 text-sm">
            Fill out the form below to submit your application
          </p>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800 flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 text-sm"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                className={`w-full border-2 rounded-lg px-3 py-2 focus:ring-2 transition-all placeholder-gray-400 text-sm ${
                  alreadyApplied
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="your.email@example.com"
                value={email}
                onChange={handleEmailChange} // Use the new handler
                required
              />
              {/* Add feedback messages for the email check */}
              {emailCheckStatus === "loading" && (
                <p className="text-xs text-gray-500 mt-1">Checking email...</p>
              )}
              {alreadyApplied && (
                <p className="text-xs text-red-600 font-medium mt-1">
                  You have already applied with this email.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                LinkedIn Profile
              </label>
              <input
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 text-sm"
                placeholder="linkedin.com/in/yourprofile"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Portfolio/Website
              </label>
              <input
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 text-sm"
                placeholder="yourportfolio.com"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800 flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            Resume Upload
          </h3>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Upload Your Resume *
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFile}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 bg-gray-50 hover:bg-gray-100 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-3 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {resume && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  ✓ {resume.name}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Accepted formats: PDF, DOC, DOCX (Max 10MB)
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800 flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            Required Skills
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select all skills that apply to you *
            </label>
            <div className="flex flex-wrap gap-2">
              {(job.keySkills || []).map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2.5 rounded-full border-2 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md ${
                    selectedSkills.includes(skill)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white border-gray-300 hover:border-blue-300 text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {selectedSkills.includes(skill) && (
                    <span className="mr-1.5">✓</span>
                  )}
                  {skill}
                </button>
              ))}
            </div>
            {selectedSkills.length > 0 && (
              <p className="text-sm text-green-600 font-medium">
                {selectedSkills.length} skill
                {selectedSkills.length !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>
        </div>

        {/* Errors */}
        {(formError || applicationError) && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 p-3 rounded-lg text-sm flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-medium">Please fix the following error:</p>
              <p className="mt-1">{formError || applicationError}</p>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={applicationStatus === "loading"}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span>Submit Application</span>
          </button>
        </div>
      </form>
    </div>
  );
}
