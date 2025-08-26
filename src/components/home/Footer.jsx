import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, Phone, MapPin, Instagram, Contact, Home, FileText, Users } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/BrainFogLogo.png" alt="logo" />
              </div>
              <p className="text-body text-gray-300 leading-relaxed max-w-md">
                We’re eager to collaborate with businesses and innovators who share our passion for technology and growth. Whether you’re a startup seeking AI solutions, a brand aiming to leverage marketing trends, or a tech enthusiast with bold ideas, we value partners who prioritize innovation, sustainability, and impact. Let’s work together to create solutions that transform industries and drive success.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/company/brainfogagency/"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/brainfog_agency?igsh=MW0xYTF6OXk0cWUyZw=="
                className="w-10 h-10 bg-gray-800 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/*Quick Links*/}
          <div className="space-y-4">
            <h4 className="text-body font-semibold text-white0">Qucik Links</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-body-sm text-gray-300">
                <Home className="w-4 h-4 text-blue-400" />
                <a href="#" className="hover:text-hero-accent-orange transition-colors">Home</a>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-gray-300">
                <FileText className="w-4 h-4 text-blue-400" />
                <a href="#job" className="hover:text-hero-accent-orange transition-colors">Job</a>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-gray-300">
                <Users className="w-4 h-4 text-blue-400" />
                <a href="/about" className="hover:text-hero-accent-orange transition-colors">About</a>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-gray-300">
                <Contact className="w-4 h-4 text-blue-400" />
                <a href="#contact" className="hover:text-hero-accent-orange transition-colors">Contact</a>
              </div>
            </div>
          </div>

          {/*Contact Information*/}
          <div className="space-y-4">
            <h4 className="text-body font-semibold text-white0">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-body-sm text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@brainfogagency.com" className="hover:text-hero-accent-orange transition-colors">info@brainfogagency.com</a>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+917045340693" className="hover:text-hero-accent-orange transition-colors">+91 704 534 0693</a>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-gray-300">
                <MapPin className="w-12 h-12 text-blue-400" />
                <p className="text-sm mb-sm mr-0.5">Mumbai Office: 206, Pareeni I, Veera Desai Road, Andheri West, Mumbai, India</p>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-gray-300">
                <MapPin className="w-7.5 h-7.5 text-blue-400" />
                <p className="text-sm mb-sm">Dubai Office: DIFC – Dubai AI Campus, Dubai, UAE</p>
              </div>
            </div>
          </div>

          {/* Job Seekers
          <div className="space-y-4">
            <h4 className="text-body font-semibold text-white">For Job Seekers</h4>
            <ul className="space-y-3">
              {[
                { label: "Browse Jobs", href: "/jobs" },
                { label: "Companies", href: "/companies" },
                { label: "Salary Guide", href: "/salary" },
                { label: "Career Resources", href: "/resources" },
                { label: "Resume Builder", href: "/resume" },
                { label: "Interview Prep", href: "/interview-prep" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-body font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Press", href: "/press" },
                { label: "Blog", href: "/blog" },
                { label: "Help Center", href: "/help" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-body-sm text-gray-400">
              © {currentYear} BrainFog Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-body-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-body-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-body-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
