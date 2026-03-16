"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DateRangePicker from "@/components/ui/DateRangePicker";
import GuestCounter from "@/components/ui/GuestCounter";
import { useBookingStore } from "@/hooks/useBookingStore";

interface DateGuestSelectorProps {
  propertyId: string;
}

export default function DateGuestSelector({ propertyId }: DateGuestSelectorProps) {
  const router = useRouter();
  const { setBookingDates, setGuests } = useBookingStore();

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleNext = () => {
    if (!checkIn || !checkOut) return;
    setBookingDates(checkIn, checkOut);
    setGuests(adults, children);
    router.push(`/booking/${propertyId}/step-2`);
  };

  const isValid = checkIn && checkOut;

  return (
    <div className="space-y-6">
      <DateRangePicker
        checkIn={checkIn}
        checkOut={checkOut}
        onChange={(ci, co) => { setCheckIn(ci); setCheckOut(co); }}
        inline
      />

      <div>
        <label className="block font-en text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          인원
        </label>
        <GuestCounter
          adults={adults}
          children={children}
          onChange={(a, c) => { setAdults(a); setChildren(c); }}
        />
      </div>

      <button
        onClick={handleNext}
        disabled={!isValid}
        className="w-full bg-black text-white font-semibold rounded-full py-4 text-[15px] hover:bg-gray-900 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        다음 단계로
      </button>
    </div>
  );
}
