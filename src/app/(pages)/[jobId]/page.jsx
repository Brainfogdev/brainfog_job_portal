"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Nav from "@/components/home/Nav";
import JobDetails from "@/components/apply/JobDetails";
import ApplicationForm from "@/components/apply/ApplicationForm";
import { fetchJobs } from "@/lib/redux/features/job/JobSlice";
import "@/app/globals.css";
import NotFound from "../error/page";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JobPageClient() {
  const params = useParams();
  const { jobId } = params;

  const dispatch = useDispatch();
  const jobsSlice = useSelector((state) => state.jobs);

  // Normalize Jobs data structure
  const jobsArray = useMemo(() => {
    if (!jobsSlice) return [];
    if (Array.isArray(jobsSlice)) return jobsSlice;
    if (Array.isArray(jobsSlice.jobs)) return jobsSlice.jobs;
    if (Array.isArray(jobsSlice.data)) return jobsSlice.data;
    if (Array.isArray(jobsSlice.items)) return jobsSlice.items;
    return [];
  }, [jobsSlice]);

  const status =
    jobsSlice?.status ?? (Array.isArray(jobsSlice) ? "succeeded" : "idle");
  const error = jobsSlice?.error ?? null;

  const job = jobsArray.find((j) => String(j?.id) === String(jobId));

  // Fetch jobs if not already
  useEffect(() => {
    const isValidJobId = jobId && !isNaN(Number(jobId));
    if (status === "idle" && isValidJobId) {
      dispatch(fetchJobs());
    }
  }, [status, dispatch, jobId]);

  // Loading Ui
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error UI
  if (status === "failed") {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  // Invalid or not found jobId
  if (!jobId || isNaN(Number(jobId)) || !job) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center">
          <NotFound />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation Bar */}
      <Nav />

      {/* Main Content */}
      <div className="max-w-[1400px] mt-[50px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 font-heading font-500 mb-8 sm:mb-12 transition-all duration-200 hover:gap-4 hover:translate-x-1"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </Link>

        {/* Hero Section */}
        <div className="mb-12 sm:mb-16 text-center max-w-4xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-700 text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            {job.title}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-base sm:text-lg text-gray-600 font-heading">
            <span className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              {job.department || "General"}
            </span>
            <span className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {job.workType || "Remote"}
            </span>
            <span className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              {job.experienceRequired || "2-5"} years exp
            </span>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Job Details */}
          <div className="order-1 xl:order-1 xl:col-span-3">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200/80 overflow-hidden">
              <JobDetails job={job} />
            </div>
          </div>

          {/* Application Form */}
          <div className="order-2 xl:order-2 xl:col-span-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200/80 xl:sticky xl:top-24">
              <ApplicationForm job={job} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
