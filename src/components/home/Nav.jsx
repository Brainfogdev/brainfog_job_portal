"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, FileText, Mail, Menu, X } from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "#job", label: "Job", icon: FileText },
    { href: "#about", label: "About", icon: Users },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
              <img
                src="/BrainFogLogo.png"
                alt="logo"
                className="w-40 h-7" // adjust size here (w-8, w-12, etc.)
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 hover:scale-105"
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-gray-100 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
