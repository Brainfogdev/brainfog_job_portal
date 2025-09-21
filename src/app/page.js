"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/home/Nav";
import Hero from "../components/home/Hero";
import Filters from "../components/home/job/Filters";
import JobGrid from "../components/home/job/JobGrid";
import Footer from "../components/home/Footer";
import { fetchJobs } from "@/lib/redux/features/job/JobSlice";
import Link from "next/link";

export default function Page() {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <main className="w-full">
        {/* Jobs Section - Immediately after Hero */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-8xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="font-heading text-5xl lg:text-6xl font-700 text-gray-900 mb-8 tracking-tight leading-[1.1]">
                Open Positions
              </h2>
              <p className="font-heading text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Find your next opportunity and help us build the future of
                talent technology.
              </p>
              <div className="mt-8 flex items-center justify-center gap-6 text-body-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Remote-First Culture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Competitive Packages</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Growth Opportunities</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
              {/* Filters Sidebar - Adjusted */}
              <aside className="w-full xl:w-80 2xl:w-[360px] ml-4 pr-6 flex-shrink-0">
                <div className="sticky top-24 pr-8">
                  <div className="text-lg font-medium leading-relaxed space-y-3">
                    <Filters
                      filters={filters}
                      setFilters={setFilters}
                      jobs={jobs}
                    />
                  </div>
                </div>
              </aside>

              {/* Job Grid - Optimized */}
              <section className="flex-1 min-w-0 ml-0 xl:ml-[-80px]">
                {status === "loading" && (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-body text-gray-600 text-lg">
                        Finding amazing opportunities...
                      </p>
                    </div>
                  </div>
                )}

                {status === "failed" && (
                  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-lg">⚠️</span>
                      </div>
                      <h3 className="text-lg font-semibold text-red-900">
                        Error Loading Jobs
                      </h3>
                    </div>
                    <p className="text-body text-red-700">{error}</p>
                    <button
                      onClick={() => dispatch(fetchJobs())}
                      className="btn btn-secondary mt-3"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {status === "succeeded" && (
                  <JobGrid jobs={jobs} filters={filters} />
                )}
              </section>
            </div>
          </div>
        </section>
        {/* Hero Section */}
        <Hero />

        {/* Why BrainFog Section - Authentic & Real */}
        <section
          className="py-24 bg-gradient-to-b from-white to-gray-50 "
          id="about"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl lg:text-6xl font-700 text-gray-900 mb-6 tracking-tight">
                Life at <span className="text-blue-600">BrainFog</span>
              </h2>
              <p className="font-heading text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Real stories from real people building something meaningful
                together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-600 text-gray-900">
                      Global Collaboration
                    </h3>
                    <p className="text-sm text-gray-500">
                      Connected across borderss
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our teams work seamlessly between Mumbai and the Dubai AI
                  Campus, bringing diverse perspectives to every project.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-600 text-gray-900">
                      Innovation-Driven
                    </h3>
                    <p className="text-sm text-gray-500">AI at the core</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  From data science breakthroughs to AI-powered marketing, we
                  push the boundaries of technology to solve complex challenges.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-600 text-gray-900">
                      Impactful Work
                    </h3>
                    <p className="text-sm text-gray-500">Shaping the future</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We tackle real-world problems—optimizing workflows, crafting
                  hyper-personalized campaigns, and delivering results that
                  matter.
                </p>
              </div>

              {/* <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 font-bold">📚</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-600 text-gray-900">Learning Budget</h3>
                    <p className="text-sm text-gray-500">$2k annually</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Books, courses, conferences. Invest in yourself, we'll cover the bill.
                </p>
              </div> */}

              {/* <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 font-bold">❤️</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-600 text-gray-900">Full Healthcare</h3>
                    <p className="text-sm text-gray-500">100% covered</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Medical, dental, vision. We cover it all, including your family.
                </p>
              </div> */}

              {/* <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 font-bold">📈</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-600 text-gray-900">Equity Package</h3>
                    <p className="text-sm text-gray-500">Own part of the company</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every team member gets equity. When we win, you win.
                </p>
              </div>*/}
            </div>

            {/* Team Quote */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-center">
                <p className="font-heading text-xl text-gray-700 mb-6 italic">
                  {
                    "“We're not just building software—we're solving real problems for real people. Every line of code matters, and every team member has a voice.”"
                  }
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">V</span>
                  </div>
                  <div className="text-left">
                    <p className="font-heading font-600 text-gray-900">
                      Osama Sharif
                    </p>
                    <p className="text-sm text-gray-500">Co-Founder & CTO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Webapp Theme Matching */}
        <section
          className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50/40 relative overflow-hidden border-t border-gray-200"
          id="contact"
        >
          {/* Background Pattern - Matching webapp */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjFmNWY5IiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-30"></div>
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] opacity-40"
            style={{ backgroundSize: "20px 20px" }}
          ></div>

          <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full text-sm font-medium mb-8 text-blue-700 border border-blue-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{"We're"} actively hiring</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-700 mb-8 leading-tight text-gray-900">
              {"Let's"} Build Something
              <span className="block text-blue-600">Together</span>
            </h2>

            <p className="font-heading text-lg sm:text-xl lg:text-2xl mb-12 text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {"Don't"} see the perfect role? Drop us a line anyway.
              <span className="block sm:inline">
                <br className="hidden sm:block" />
                <span className="text-gray-900 font-600">
                  Great people make their own opportunities.
                </span>
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch sm:items-center">
              <Link
                href="mailto:info@brainfogagency.com"
                className="btn btn-primary btn-xl font-heading shadow-xl hover:shadow-blue-500/25 w-full sm:w-auto"
              >
                <span>Get In Touch</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              <Link
                href="#about"
                className="btn btn-secondary btn-xl font-heading w-full sm:w-auto"
              >
                About BrainFog
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@brainfogagency.com
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  We typically respond within 24h
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
