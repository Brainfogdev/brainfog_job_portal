"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  MapPin,
  Briefcase,
  Building,
  Target
} from "lucide-react";

export default function Filters({ jobs = [], filters = {}, setFilters }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  // Department counts
  const departments = useMemo(() => {
    const allDepartments = ["Engineering", "Product", "Marketing", "Sales", "Operations", "HR", "IT"];
    const deptCounts = {};
    safeJobs.forEach(job => {
      if (job.department) {
        deptCounts[job.department] = (deptCounts[job.department] || 0) + 1;
      }
    });
    
    return allDepartments.map(name => ({
      name,
      count: deptCounts[name] || 0,
    })).sort((a, b) => b.count - a.count);
  }, [safeJobs]);

  // Locations
  const locations = useMemo(() => {
    const counts = {};
    safeJobs.forEach(job => {
      const loc = job.workType || job.location;
      if (loc) counts[loc] = (counts[loc] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [safeJobs]);

  // Job Types
  const jobTypes = useMemo(() => {
    const counts = {};
    safeJobs.forEach(job => {
      const type = job.jobType || "Full-time";
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [safeJobs]);

  // Experience Levels
  const experienceLevels = useMemo(() => {
    const counts = {};
    safeJobs.forEach(job => {
      if (job.experienceRequired) {
        let exp = job.experienceRequired;
        let level =
          exp <= 2 ? "Entry (0-2y)" :
          exp <= 5 ? "Mid (3-5y)" :
          exp <= 8 ? "Senior (6-8y)" :
          "Lead (8y+)";
        counts[level] = (counts[level] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [safeJobs]);

  function toggleFilter(key, value) {
    setFilters(f => ({ ...f, [key]: f[key] === value ? null : value }));
  }

  function clearAllFilters() {
    setFilters({});
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold">Filters</span>
          {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
        <button
          onClick={clearAllFilters}
          className={`text-xs font-medium ${
            activeFiltersCount === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:underline"
          }`}
          disabled={activeFiltersCount === 0}
        >
          Clear all
        </button>
      </div>

      {/* Body */}
      {!isCollapsed && (
        <div className="p-3 space-y-4">
          {/* Department */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-700">
              <Building className="w-3 h-3" /> Department
            </div>
            {departments.map(dept => (
              <label key={dept.name} className="flex items-center justify-between text-[13px] py-0.5 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.department === dept.name}
                    onChange={() => toggleFilter("department", dept.name)}
                    className="w-3 h-3"
                  />
                  <span>{dept.icon}</span>
                  <span>{dept.name}</span>
                </div>
                <span className="text-gray-500">{dept.count}</span>
              </label>
            ))}
          </div>

          {/* Job Type */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[13px] font-semibold text-gray-700">
              <Briefcase className="w-3 h-3" /> Job Type
            </div>
            {jobTypes.map(type => (
              <label key={type.name} className="flex items-center justify-between text-[13px] py-0.5 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.jobType === type.name}
                    onChange={() => toggleFilter("jobType", type.name)}
                    className="w-3 h-3"
                  />
                  <span>{type.name}</span>
                </div>
                <span className="text-gray-500">{type.count}</span>
              </label>
            ))}
          </div>

          {/* Location */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[13px] font-semibold text-gray-700">
              <MapPin className="w-3 h-3" /> Location
            </div>
            {locations.slice(0, 6).map(location => (
              <label key={location.name} className="flex items-center justify-between text-[13px] py-0.5 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.location === location.name}
                    onChange={() => toggleFilter("location", location.name)}
                    className="w-3 h-3"
                  />
                  <span>{location.name}</span>
                </div>
                <span className="text-gray-500">{location.count}</span>
              </label>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[13px] font-semibold text-gray-700">
              <Target className="w-3 h-3" /> Experience
            </div>
            {experienceLevels.map(level => (
              <label key={level.name} className="flex items-center justify-between text-[13px] py-0.5 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.experience === level.name}
                    onChange={() => toggleFilter("experience", level.name)}
                    className="w-3 h-3"
                  />
                  <span>{level.name}</span>
                </div>
                <span className="text-gray-500">{level.count}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
