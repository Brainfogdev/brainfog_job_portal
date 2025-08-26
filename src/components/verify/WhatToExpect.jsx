import { FileText, Wifi, Monitor, VideoIcon } from "lucide-react"

export default function WhatToExpect() {
  const expectations = [
    { icon: FileText, text: "Your resume and portfolio" },
    { icon: Wifi, text: "Stable internet connection" },
    { icon: Monitor, text: "Professional environment" },
    { icon: VideoIcon, text: "Video conferencing setup" },
  ]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">What to Expect</h3>
      <div className="space-y-3">
        {expectations.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
          >
            <item.icon size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors duration-200" />
            <span className="text-gray-700 text-sm">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
