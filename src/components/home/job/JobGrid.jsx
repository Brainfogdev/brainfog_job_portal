import React, { useState } from "react";
import JobCard from "./JobCard";
import { Search, SlidersHorizontal, Grid, List, ChevronDown } from "lucide-react";

export default function JobGrid({ jobs = [], filters = {} }) {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  function applyFilters(j) {
    if (!filters) return true;
    if (filters.department && j.department !== filters.department) return false;
    if (filters.location && j.workType !== filters.location) return false;
    if (filters.jobType) {
      const jobType = j.jobType || "Full-time";
      if (jobType !== filters.jobType) return false;
    }
    if (filters.salary) {
      // Add salary filtering logic here
    }
    if (filters.experience) {
      // Add experience filtering logic here  
    }
    return true;
  }

  function sortJobs(jobs) {
    switch (sortBy) {
      case "newest":
        return jobs.sort((a, b) => new Date(b.datePosted || 0) - new Date(a.datePosted || 0));
      case "salary":
        return jobs.sort((a, b) => {
          const salaryA = parseInt((a.salary || "0").replace(/[^0-9]/g, ""));
          const salaryB = parseInt((b.salary || "0").replace(/[^0-9]/g, ""));
          return salaryB - salaryA;
        });
      case "company":
        return jobs.sort((a, b) => (a.company || "").localeCompare(b.company || ""));
      default:
        return jobs;
    }
  }

  const visibleJobs = sortJobs(safeJobs.filter(applyFilters));
  
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="w-full space-y-6">
      {/* Header with Search and Controls */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Results Summary - Enhanced */}
          <div className="flex items-center gap-4">
            <h3 className="text-h4 font-700 text-gray-900">
              {visibleJobs.length} Position{visibleJobs.length !== 1 ? 's' : ''} Available
            </h3>
            {activeFiltersCount > 0 && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-caption font-600 rounded-full border border-blue-200/50">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
              </span>
            )}
          </div>

          {/* Controls - Enhanced */}
          <div className="flex items-center gap-4">
            {/* Mobile Filters Button */}
            {/* <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="xl:hidden btn btn-secondary flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="font-500">Filters</span>
            </button> */}

            {/* Sort Dropdown - Enhanced */}
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200/80 rounded-xl px-4 py-2.5 pr-10 text-body-sm font-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-gray-300 transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="salary">Highest Salary</option>
                {/* <option value="company">Company A-Z</option> */}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle - Enhanced */}
            <div className="hidden sm:flex border border-gray-200/80 rounded-xl p-1 bg-gray-50/50">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === "grid" ? "bg-white text-blue-600 shadow-sm border border-blue-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-white/60"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === "list" ? "bg-white text-blue-600 shadow-sm border border-blue-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-white/60"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Results - Fixed Grid */}
      <div className="scroll-area max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
        {visibleJobs.length > 0 ? (
          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr" 
              : "space-y-6"
          }`}>
            {visibleJobs.map((job, index) => (
              <div 
                key={job.id || job.mongoId || index}
                className={`animate-fade-in ${viewMode === "list" ? "w-full" : ""}`}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-h4 font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-body text-gray-600 max-w-md mx-auto">
              No jobs match your current filters. Try adjusting your search criteria or clearing some filters.
            </p>
            {activeFiltersCount > 0 && (
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-secondary mt-4"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Load More (if pagination needed) */}
      {visibleJobs.length >= 20 && (
        <div className="text-center py-8">
          <button className="btn btn-secondary">
            Load More Jobs
          </button>
        </div>
      )}
    </div>
  );
}
