import { Suspense } from "react";
import { Loader } from "lucide-react";

// Import your page sections and layout components
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import RecruiterProfile from "@/components/verify/RecruiterProfile";
import WhatToExpect from "@/components/verify/WhatToExpect";
import ApplicationTimeline from "@/components/verify/ApplicationTimeline";
import NeedHelp from "@/components/verify/NeedHelp";
import VerifyFlow from "@/components/verify/VerifyFlow"; // <-- Import your new client component

// A simple fallback component to show while the client component is loading
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm">
      <Loader className="animate-spin text-orange-500 w-12 h-12" />
      <p className="mt-4 font-semibold text-gray-700">Loading...</p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* FIX: Wrap the dynamic client component in a Suspense boundarY */}
              <Suspense fallback={<LoadingFallback />}>
                <VerifyFlow />
              </Suspense>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-6">
              <RecruiterProfile />
              <WhatToExpect />
              <ApplicationTimeline />
              <NeedHelp />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
