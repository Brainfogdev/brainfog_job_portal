"use client";
import { useSelector } from "react-redux";
import { Clock, Check, X } from "lucide-react";

// A helper to format the date and time
const formatDateTime = (dateString, startTime, endTime) => {
  const date = new Date(dateString);
  const options = { weekday: "long", month: "long", day: "numeric" };
  return `${date.toLocaleDateString(
    undefined,
    options
  )}, ${startTime} - ${endTime}`;
};

export default function TimeSlotSelector({ onSlotSelect, selectedSlot }) {
  // `slots` now contains ALL slots (booked and available) from `allSlots` array
  const { slots, slotsStatus, slotsError } = useSelector(
    (state) => state.verify
  );

  if (slotsStatus === "loading") {
    return <div className="p-4 text-center">Loading interview slots...</div>;
  }

  if (slotsStatus === "failed") {
    return (
      <div className="p-4 text-center text-red-600">Error: {slotsError}</div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        No interview slots are currently scheduled for this role.
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Select an Interview Time
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          const isBooked = slot.isBooked; // Use the isBooked flag from the API

          return (
            <button
              key={slot.id}
              onClick={() => {
                // Only allow selecting if the slot is NOT booked
                if (!isBooked) {
                  onSlotSelect(slot);
                }
              }}
              // Disable the button if the slot is already booked
              disabled={isBooked}
              className={`p-4 rounded-lg border-2 text-left transition-all relative
                ${
                  isSelected && !isBooked
                    ? "bg-orange-100 border-orange-500 scale-105 shadow-md"
                    : isBooked
                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" // Disabled style
                    : "bg-white border-gray-200 hover:border-orange-400" // Available style
                }
              `}
            >
              {/* Main time text */}
              <p
                className={`font-semibold ${
                  isBooked ? "text-gray-500" : "text-gray-800"
                }`}
              >
                {formatDateTime(slot.date, slot.startTime, slot.endTime)}
              </p>

              {/* Status indicator: Available vs. Booked */}
              <div className="text-sm flex items-center gap-2 mt-1">
                {isBooked ? (
                  <>
                    <X size={14} className="text-red-400" />
                    <span className="text-red-500 font-medium">Booked</span>
                  </>
                ) : (
                  <>
                    <Check size={14} className="text-green-500" />
                    <span className="text-green-600 font-medium">
                      Available
                    </span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
