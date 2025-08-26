"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Users } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  const departments = ["Engineering", "Product", "Marketing", "Sales", "Operations", "HR", "IT"];
  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  
  useEffect(() => {
    let timeout;
    const currentWord = departments[currentDepartment];
    
    if (isTyping) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 120);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 80);
      } else {
        setCurrentDepartment((prev) => (prev + 1) % departments.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentDepartment, departments]);

  return (
    <section className="relative w-full min-h-[100vh] bg-gradient-to-br from-white via-gray-50/30 to-blue-50/40 overflow-hidden flex items-center">
      {/* Enhanced 3D Background Elements - More Visible */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-400/40 to-purple-400/30 rounded-2xl transform rotate-45 animate-float shadow-lg" style={{animationDelay: "0s"}}></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-br from-purple-400/35 to-pink-400/25 rounded-xl transform rotate-12 animate-float shadow-md" style={{animationDelay: "2s"}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-indigo-300/25 to-blue-300/20 rounded-2xl transform -rotate-12 animate-float shadow-lg" style={{animationDelay: "4s"}}></div>
        <div className="absolute top-1/2 left-1/6 w-6 h-6 bg-gradient-to-br from-green-400/40 to-teal-400/30 rounded-lg transform rotate-45 animate-float shadow-md" style={{animationDelay: "1s"}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-gradient-to-br from-orange-400/30 to-red-400/25 rounded-xl transform -rotate-45 animate-float shadow-md" style={{animationDelay: "3s"}}></div>
        <div className="absolute top-1/6 right-1/6 w-4 h-4 bg-gradient-to-br from-cyan-400/35 to-blue-400/30 rounded-lg transform rotate-30 animate-float shadow-sm" style={{animationDelay: "5s"}}></div>
        <div className="absolute bottom-1/6 left-1/2 w-7 h-7 bg-gradient-to-br from-violet-400/30 to-purple-400/25 rounded-lg transform -rotate-30 animate-float shadow-md" style={{animationDelay: "2.5s"}}></div>
      </div>

      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30"></div>

      {/* Grid Pattern - Enhanced */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjFmNWY5IiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-30"></div>
      
      {/* Enhanced Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.25)_1px,transparent_0)] opacity-50" style={{backgroundSize: '20px 20px'}}></div>
      


      {/* Hero Content */}
      <div className="relative w-full max-w-6xl mx-auto px-6 py-20" >
        <div
          className={`text-center transform transition-all duration-1200 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Company Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-blue-50/80 backdrop-blur-sm border border-blue-200/60 rounded-full text-blue-700 mb-10  shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" id="job"></div>
            <span className="text-body-sm font-600 tracking-wide">Currently Hiring</span>
          </div>

          {/* Main Headline - Startup-inspired Typography */}
          <h1 className="font-display font-900 text-gray-900 mb-12 leading-[0.9] tracking-[-0.025em]">
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-2 font-400 text-gray-800">
              Build the
            </span>
            <span className="relative block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-800 mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {displayText}
                <span className={`inline-block w-1 h-16 lg:h-20 xl:h-24 bg-blue-600 ml-2 ${isTyping ? 'animate-pulse' : 'opacity-100'}`}></span>
              </span>
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-400 text-gray-800">
              future
            </span>
          </h1>

          {/* Subtitle - Clean & Direct */}
          <p className="font-heading text-xl lg:text-2xl text-gray-600 mb-16 max-w-2xl mx-auto leading-[1.4] font-400">
            Join a team that's reshaping how talent meets opportunity.
            <span className="block mt-2 text-gray-500 text-lg font-300">Remote-first • Global impact • Unlimited growth</span>
          </p>

          {/* CTA Section - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-20">
            <Link href="" className="btn btn-primary btn-xl group shadow-xl font-heading w-full sm:w-auto">
              <span className="text-lg font-600">Explore Opportunities</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="#about" className="btn btn-ghost btn-xl group font-heading w-full sm:w-auto">
              <span className="text-lg font-500">Learn About Us</span>
            </Link>
          </div>
          
          {/* Trust Indicators - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500 font-heading">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>200+ Team Members</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>15+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>5M+ Users Served</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
