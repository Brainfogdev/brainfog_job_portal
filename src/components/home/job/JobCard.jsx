import React from "react";
import {
  Share2,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function JobCard({ job = {} }) {
  // Skill colors
  const skillColors = [
    { bg: "#EBF3FF", color: "#2563EB", border: "#BFDBFE" },
    { bg: "#F0F9FF", color: "#0284C7", border: "#BAE6FD" },
    { bg: "#ECFDF5", color: "#059669", border: "#BBF7D0" },
    { bg: "#FEF3C7", color: "#D97706", border: "#FDE68A" },
    { bg: "#FAF5FF", color: "#7C3AED", border: "#DDD6FE" },
    { bg: "#FEE2E2", color: "#DC2626", border: "#FECACA" },
    { bg: "#FFF7ED", color: "#EA580C", border: "#FED7AA" },
  ];

  function getSkillColor(skill) {
    if (!skill) return skillColors[0];
    let hash = 0;
    for (let i = 0; i < skill.length; i++) {
      hash = ((hash << 5) - hash + skill.charCodeAt(i)) & 0xffffffff;
    }
    return skillColors[Math.abs(hash) % skillColors.length];
  }

  // --- FINALIZED SHARE FUNCTION ---
  async function handleShare(e) {
    e.stopPropagation();

    const applyLink = `${window.location.origin}/${job.id}`;
    const descriptionSnippet = job.jobDescription
      ? `${job.jobDescription.slice(0, 120)}...`
      : "Join our innovative team and help shape the future of technology.";

    const shareText = `🚀 Exciting opportunity at Brainfog Agency!

*Position:* ${job.title}

*Description:* ${descriptionSnippet}

Think you're a good fit? Apply now and let's build something amazing together!

*Apply Here:*
${applyLink}`;

    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
        });
        return;
      } catch (err) {
        console.log("User cancelled share or API failed. Falling back.");
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy text to clipboard: ", err);
      alert("Error: Could not copy job details.");
    }
  }

  return (
    <article
      id={`job-${job?.id || job?.mongoId || "unknown"}`}
      onClick={() =>
        (window.location.href = `/${job?.id || job?.mongoId || ""}`)
      }
      className="group mt-3 relative bg-white rounded-2xl border border-gray-200/80 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in h-full transform hover:-translate-y-1 max-w-full overflow-hidden"
    >
    {/* Gradient Top Border slightly under the card */}
  <div className="h-1 pt-3 w-full rounded-t-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -translate-y-0.5"></div>

      <div className="p-6 h-full flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1 break-words">
                {job?.title || "Untitled Role"}
              </h3>
              <p className="text-sm text-gray-600 font-medium truncate">
                {job?.company || "BrainFog Inc."}
              </p>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            title="Share Job"
            className="ml-2 w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 
             opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 flex-shrink-0"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Job Meta */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium truncate">
              {job?.workType || "Remote"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium truncate">
              {job?.jobType || "Full-time"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
            <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium truncate">
              {job?.totalApplicants || 0} Applicants
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
            <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium truncate">
              {job?.salary || "Competitive"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed mb-5 flex-grow break-words">
          {job?.jobDescription
            ? job.jobDescription.length > 120
              ? job.jobDescription.slice(0, 120) + "..."
              : job.jobDescription
            : "Join our innovative team and help shape the future of technology. We're looking for passionate individuals who want to make a real impact in a fast-growing startup environment."}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6 min-w-0">
          {(
            job?.keySkills ||
            job?.requiredSkills || ["React", "TypeScript", "Node.js"]
          )
            .slice(0, 3)
            .map((skill) => {
              const colors = getSkillColor(skill);
              return (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.color,
                    borderColor: colors.border,
                  }}
                >
                  {skill}
                </span>
              );
            })}
          {(job?.keySkills || job?.requiredSkills || []).length > 3 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
              +{(job?.keySkills || job?.requiredSkills || []).length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-body-sm text-green-600 font-medium">
                {job?.experienceRequired
                  ? `${job.experienceRequired}+ years`
                  : "Open to all levels"}
              </span>
            </div>

            <Link
              href={`/${job?.id || job?.mongoId || ""}`}
              onClick={(e) => e.stopPropagation()}
              className="btn btn-primary btn-sm px-6 py-2.5"
            >
              Apply Now
            </Link>
          </div>

          <div className="mt-3 text-caption text-gray-500">
            Posted{" "}
            {job?.createdAt
              ? new Date(job.createdAt).toLocaleDateString()
              : "recently"}
          </div>
        </div>
      </div>
    </article>
  );
}
