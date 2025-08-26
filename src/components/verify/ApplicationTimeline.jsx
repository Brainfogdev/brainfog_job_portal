import { CheckCircle } from "lucide-react"

export default function ApplicationTimeline() {
  const applicationSteps = [
    { name: "Application", completed: true },
    { name: "Shortlist", completed: true },
    { name: "Interview", completed: true, current: true },
    { name: "Feedback", completed: false },
    { name: "Decision", completed: false },
  ]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
      <div className="space-y-4">
        {applicationSteps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                step.completed
                  ? "bg-green-500 text-white"
                  : step.current
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              {step.completed ? <CheckCircle size={16} /> : <div className="w-2 h-2 bg-current rounded-full"></div>}
            </div>
            <span
              className={`text-sm transition-colors duration-200 ${
                step.completed || step.current ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
