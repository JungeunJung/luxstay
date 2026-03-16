"use client";

import { useState, useCallback } from "react";
import type { GuestInfo } from "@/types/booking";

interface BookingState {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  guestInfo: GuestInfo | null;
}

interface BookingStore extends BookingState {
  setBookingDates: (checkIn: Date, checkOut: Date) => void;
  setGuests: (adults: number, children: number) => void;
  setGuestInfo: (info: GuestInfo) => void;
  reset: () => void;
}

// 전역 상태 (간단한 구현 — 필요시 Zustand 또는 Context API로 교체)
let globalState: BookingState = {
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  guestInfo: null,
};

const listeners = new Set<() => void>();

function setGlobal(updater: (prev: BookingState) => BookingState) {
  globalState = updater(globalState);
  listeners.forEach((l) => l());
}

export function useBookingStore(): BookingStore {
  const [, forceUpdate] = useState(0);

  const subscribe = useCallback(() => {
    const rerender = () => forceUpdate((n) => n + 1);
    listeners.add(rerender);
    return () => listeners.delete(rerender);
  }, []);

  return {
    ...globalState,
    setBookingDates: (checkIn, checkOut) =>
      setGlobal((prev) => ({ ...prev, checkIn, checkOut })),
    setGuests: (adults, children) =>
      setGlobal((prev) => ({ ...prev, adults, children })),
    setGuestInfo: (guestInfo) =>
      setGlobal((prev) => ({ ...prev, guestInfo })),
    reset: () =>
      setGlobal(() => ({
        checkIn: null,
        checkOut: null,
        adults: 2,
        children: 0,
        guestInfo: null,
      })),
  };
}
