"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Clock, Video } from "lucide-react";
import TimeSlotSelector from "@/components/verify/TimeSlotSelector";
import ContactForm from "@/components/verify/ContactForm";
import {
  fetchInterviewSlots,
  bookInterviewSlot,
} from "@/lib/redux/features/verify/VerifySlice";

export default function ShortlistedStatus({ jobTitle }) {
  const dispatch = useDispatch();

  const {
    jobId,
    email, // This is the verified candidate email from the Redux store
    slotsStatus,
    bookingStatus,
    bookingError,
  } = useSelector((state) => state.verify);

  const [selectedSlot, setSelectedSlot] = useState(null);

  // This useEffect fetches the slots correctly
  useEffect(() => {
    if (jobId && slotsStatus === "idle") {
      dispatch(fetchInterviewSlots(jobId));
    }
  }, [dispatch, jobId, slotsStatus]);

  // FIX: This function now constructs the new payload for booking.
  // The contactData from the form is used for UX confirmation but not sent to the backend.
  const handleFormSubmit = (contactData) => {
    if (!selectedSlot) {
      alert("Please select a time slot first.");
      return;
    }

    // New, simpler payload based on the required schema
    const bookingPayload = {
      slotId: selectedSlot.id,
      candidateEmail: email,
    };

    // Dispatch the booking action with the new payload
    dispatch(bookInterviewSlot({ jobId, bookingData: bookingPayload }));
  };

  // --- UI Rendering Logic (no changes needed below) ---

  if (bookingStatus === "succeeded") {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          Interview Scheduled!
        </h2>
        <p className="mt-2 text-gray-600">
          Your interview has been booked. You will receive a confirmation email
          with all the details shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <CheckCircle className="text-green-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">
          You're Shortlisted for {jobTitle}!
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
        <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
          <Video size={20} className="text-blue-600" />
          <span>Video Interview</span>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
          <Clock size={20} className="text-green-600" />
          <span>45 minutes</span>
        </div>
      </div>

      <TimeSlotSelector
        onSlotSelect={setSelectedSlot}
        selectedSlot={selectedSlot}
      />

      {selectedSlot && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Confirm Your Details
          </h3>
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
      )}

      {bookingStatus === "failed" && (
        <p className="text-red-600 bg-red-50 p-3 rounded-lg mt-4">
          {bookingError}
        </p>
      )}
    </div>
  );
}
