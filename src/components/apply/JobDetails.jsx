import React from "react";

export default function JobDetails({ job }) {
  return (
    <div className="w-full">
      {/* Header - Enhanced & Mobile Responsive */}
      <div className="border-b border-gray-200 p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-3 px-3 sm:px-4 py-2 bg-blue-50 rounded-full text-xs sm:text-sm text-blue-700 font-medium mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="hidden sm:inline">{job.department} • {job.totalApplicants || 0} applicants</span>
              <span className="sm:hidden">{job.department}</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-700 text-gray-900">Job Details</h2>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="space-y-8 sm:space-y-12">
          {/* About the Role */}
          <section>
            <h3 className="font-heading text-xl font-600 text-gray-900 mb-6">About This Role</h3>
            <div className="prose max-w-none">
              <div
                className="text-lg text-gray-700 leading-relaxed job-description"
                dangerouslySetInnerHTML={{
                  __html: job.jobDescription ||
                    "Join our team and contribute to building innovative solutions that make a real difference. You'll work alongside talented individuals who are passionate about creating meaningful impact through technology."
                }}
              />
            </div>
          </section>

          {/* Additional Context */}
          {job.additionalNotes && (
            <section>
              <h3 className="font-heading text-lg font-600 text-gray-900 mb-4">What We're Looking For</h3>
              <div className="prose max-w-none">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: job.additionalNotes
                  }}
                />
              </div>
            </section>
          )}

          {/* Skills */}
          <section>
            <h3 className="font-heading text-lg font-600 text-gray-900 mb-4">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {(job.keySkills || job.requiredSkills || ["React", "TypeScript", "Node.js", "Problem Solving"]).map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Quick Details */}
          <section>
            <h3 className="font-heading text-lg font-600 text-gray-900 mb-4">Role Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Experience</div>
                <div className="font-heading font-600 text-gray-900">{job.experienceRequired || "2-5"} years</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Positions</div>
                <div className="font-heading font-600 text-gray-900">{job.vacancies || "1"} available</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Type</div>
                <div className="font-heading font-600 text-gray-900">Full-time</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Location</div>
                <div className="font-heading font-600 text-gray-900">{job.workType || 'Remote'}</div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
