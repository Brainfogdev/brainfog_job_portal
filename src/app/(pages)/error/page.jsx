import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-4">
      {/* Decorative stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-6 h-6 text-gray-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26 12,2" />
          </svg>
        </div>
        <div className="absolute top-32 right-1/3 w-4 h-4 text-gray-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26 12,2" />
          </svg>
        </div>
        <div className="absolute top-16 right-1/4 w-5 h-5 text-gray-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26 12,2" />
          </svg>
        </div>
      </div>

      {/* Main illustration */}
      <div className="relative mb-8">
        {/* Browser windows */}
        <div className="absolute -left-16 -top-8 w-24 h-16 bg-white rounded-lg shadow-md border border-gray-200 transform -rotate-12">
          <div className="flex items-center gap-1 p-2 border-b border-gray-200">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          <div className="p-2 text-xs text-gray-600">
            <div className="text-gray-800 font-mono">&lt;/&gt;</div>
          </div>
        </div>

        <div className="absolute -right-16 -top-4 w-28 h-18 bg-white rounded-lg shadow-md border border-gray-200 transform rotate-12">
          <div className="flex items-center gap-1 p-2 border-b border-gray-200">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          <div className="p-2 text-xs">
            <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
            <div className="w-3/4 h-1 bg-gray-200 rounded mb-1"></div>
            <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="absolute -left-8 top-16 w-20 h-14 bg-white rounded-lg shadow-md border border-gray-200 transform -rotate-6">
          <div className="flex items-center gap-1 p-1.5 border-b border-gray-200">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          </div>
          <div className="p-1.5 text-xs">
            <div className="text-gray-800 font-mono text-xs">&lt;/&gt;</div>
          </div>
        </div>

        {/* Central figure */}
        <div className="w-48 h-48 flex items-center justify-center">
          <video
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/no%20result%20found-GXGZhXHCojOVOQdiai6JYSDsbPstJW.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Alternative: Use the provided image instead of SVG */}
      {/* 
      <div className="mb-8">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/404.jpg-UODoL6yEa6rWvgVc3ltaSN33XPUGvU.jpeg" 
          alt="404 Error - Person meditating with floating browser windows"
          className="w-80 h-60 object-contain"
        />
      </div>
      */}

      {/* 404 Text */}
      <h1 className="text-8xl font-bold text-gray-800 mb-6 tracking-tight">404</h1>

      {/* Professional text content */}
      <div className="text-center mb-8 max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 leading-relaxed mb-2">
          The page you're looking for seems to have taken a meditation break. It might have been moved, deleted, or is
          temporarily unavailable.
        </p>
        <p className="text-gray-500 text-sm">
          Don't worry, even the best developers encounter 404s. Let's get you back on track.
        </p>
      </div>

    {/* Back to home button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Back to Home
      </Link>
    </div>
  )
}
