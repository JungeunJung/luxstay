"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/hooks/useBookingStore";
import { createBooking } from "@/lib/bookings";
import { PAYMENT_METHODS } from "@/lib/constants";

interface PaymentFormProps {
  propertyId: string;
}

export default function PaymentForm({ propertyId }: PaymentFormProps) {
  const router = useRouter();
  const { guestInfo, checkIn, checkOut, adults, children } = useBookingStore();
  const [selectedMethod, setSelectedMethod] = useState<string>("card");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!guestInfo || !checkIn || !checkOut) return;
    setIsLoading(true);
    try {
      const booking = await createBooking({
        propertyId,
        checkIn,
        checkOut,
        adults,
        children,
        guestInfo,
        paymentMethod: selectedMethod,
      });
      router.push(`/booking/confirmation?bookingId=${booking.id}`);
    } catch (error) {
      console.error("결제 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 결제 수단 선택 */}
      <div>
        <label className="block font-en text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          결제 수단
        </label>
        <div className="space-y-2">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.value}
              onClick={() => setSelectedMethod(method.value)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-[1.5px] transition-all text-left ${
                selectedMethod === method.value
                  ? "border-black bg-white"
                  : "border-transparent bg-gray-50 hover:bg-white hover:border-gray-200"
              }`}
            >
              <span className="text-xl">{method.icon}</span>
              <span className="text-sm font-medium">{method.label}</span>
              {selectedMethod === method.value && (
                <span className="ml-auto text-xs font-en font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                  선택됨
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 취소 정책 */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="font-en text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
          취소 정책
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          체크인 7일 전까지 무료 취소 가능합니다. 이후에는 첫 번째 숙박 요금이 청구됩니다.
        </p>
      </div>

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-black text-white font-semibold rounded-full py-4 text-[15px] hover:bg-gray-900 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isLoading ? "결제 처리 중..." : "결제하고 예약 완료"}
      </button>

      <p className="text-xs text-center text-gray-400">
        결제 완료 시 이용약관 및 취소 정책에 동의한 것으로 간주합니다
      </p>
    </div>
  );
}
