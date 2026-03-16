import { getBookingById } from "@/lib/bookings";
import { formatPrice, formatDate } from "@/lib/utils";

interface BookingConfirmDetailProps {
  bookingId: string;
}

export default async function BookingConfirmDetail({ bookingId }: BookingConfirmDetailProps) {
  const booking = await getBookingById(bookingId);

  if (!booking) return null;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4">
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">예약번호</span>
        <span className="font-en text-sm font-bold tracking-wider">{booking.id}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">숙소</span>
        <span className="text-sm font-semibold">{booking.propertyName}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">체크인</span>
        <span className="text-sm font-medium">{formatDate(booking.checkIn)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">체크아웃</span>
        <span className="text-sm font-medium">{formatDate(booking.checkOut)}</span>
      </div>
      <div className="border-t border-gray-200 pt-4 flex justify-between">
        <span className="text-sm font-bold">총 결제 금액</span>
        <span className="font-en text-base font-bold">{formatPrice(booking.totalAmount)}</span>
      </div>
    </div>
  );
}
