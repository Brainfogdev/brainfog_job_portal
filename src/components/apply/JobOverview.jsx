import React from "react";

export default function JobOverview({ job }) {
  return (
    <div className="card p-4">
      <h4 className="font-semibold mb-3">Job Overview</h4>
      <ul className="text-sm text-gray-700 space-y-2">
        <li>
          🏷 <strong>Department:</strong> {job.department}
        </li>
        <li>
          📍 <strong>Work Type:</strong> {job.workType}
        </li>
        <li>
          ⏱ <strong>Experience:</strong> {job.experienceRequired} years
        </li>
        <li>
          👥 <strong>Vacancies:</strong> {job.vacancies}
        </li>
      </ul>

      {job.interviewSlots && (
        <div className="mt-4">
          <h5 className="font-medium">Interview Slots</h5>
          <ul className="text-sm mt-2">
            {job.interviewSlots.map((s, idx) => (
              <li key={idx}>
                {new Date(s.date).toLocaleDateString()} — {s.startTime} to{" "}
                {s.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
