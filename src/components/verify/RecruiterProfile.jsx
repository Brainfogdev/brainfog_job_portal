import { Linkedin } from "lucide-react"

export default function RecruiterProfile() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src="/professional-woman-recruiter.png"
          alt="Sarah Johnson"
          className="w-15 h-15 rounded-full object-cover hover:scale-110 transition-transform duration-200"
        />
        <div>
          <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
          <p className="text-gray-600 text-sm">Senior Technical Recruiter</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        Passionate about connecting talented developers with innovative teams. Let's discuss how you can contribute to
        our mission.
      </p>
      <a
        href="#"
        className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-200"
      >
        <Linkedin size={16} />
        <span className="text-sm">Connect on LinkedIn</span>
      </a>
    </div>
  )
}
