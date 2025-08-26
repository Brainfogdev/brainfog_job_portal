import { Mail, Phone, HelpCircle } from "lucide-react"

export default function NeedHelp() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
      <div className="space-y-3">
        <a
          href="mailto:support@company.com"
          className="flex items-center space-x-3 text-gray-600 hover:text-orange-600 transition-colors duration-200 group"
        >
          <Mail size={16} className="group-hover:scale-110 transition-transform duration-200" />
          <span className="text-sm">support@company.com</span>
        </a>
        <a
          href="tel:+15551234567"
          className="flex items-center space-x-3 text-gray-600 hover:text-orange-600 transition-colors duration-200 group"
        >
          <Phone size={16} className="group-hover:scale-110 transition-transform duration-200" />
          <span className="text-sm">+1 (555) 123-4567</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 text-orange-600 hover:text-orange-700 transition-colors duration-200 group"
        >
          <HelpCircle size={16} className="group-hover:scale-110 transition-transform duration-200" />
          <span className="text-sm">View FAQ</span>
        </a>
      </div>
    </div>
  )
}
