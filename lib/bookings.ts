import type { Booking, CreateBookingInput } from "@/types/booking";
import { calcNights, calcTotalPrice, generateBookingId } from "@/lib/utils";

// TODO: 실제 DB 연동으로 교체 (Prisma / Supabase 등)
const BOOKINGS_STORE: Booking[] = [];

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const nights = calcNights(input.checkIn, input.checkOut);
  const property = await import("@/lib/properties").then((m) =>
    m.getPropertyById(input.propertyId)
  );

  if (!property) {
    throw new Error("숙소를 찾을 수 없습니다");
  }

  const { subtotal, tax, serviceFee, total } = calcTotalPrice(
    property.pricePerNight,
    nights
  );

  const booking: Booking = {
    id: generateBookingId(),
    propertyId: input.propertyId,
    propertyName: property.name,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    nights,
    adults: input.adults,
    children: input.children,
    guestInfo: input.guestInfo,
    paymentMethod: input.paymentMethod,
    subtotal,
    tax,
    serviceFee,
    totalAmount: total,
    status: "confirmed",
    createdAt: new Date(),
  };

  BOOKINGS_STORE.push(booking);

  // TODO: 예약 확인 이메일 / SMS 발송

  return booking;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  return BOOKINGS_STORE.find((b) => b.id === id) ?? null;
}
