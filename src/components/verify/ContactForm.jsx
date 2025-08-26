"use client";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ContactForm({ onSubmit }) {
  const [contact, setContact] = useState(""); // Can be phone or another email
  const { bookingStatus } = useSelector((state) => state.verify);
  const isLoading = bookingStatus === "loading";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ contact });
  };

  return (
    <div className="relative">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <svg
            className="animate-spin h-10 w-10 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      {/* FOrm */}
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 pt-6 border-t border-gray-200 transition-all duration-200 ${
          isLoading ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-400"
        >
          Book Interview
        </button>
      </form>
    </div>
  );
}