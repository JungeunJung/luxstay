"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types/property";

interface BookingWidgetProps {
  property: Property;
}

export default function BookingWidget({ property }: BookingWidgetProps) {
  return (
    <div
      id="booking-widget"
      data-price={property.pricePerNight}
      data-property-id={property.id}
      data-property-name={property.name}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-en text-xl font-bold">{formatPrice(property.pricePerNight)}</span>
        <span className="text-sm text-gray-400">/ 박</span>
      </div>

      {/* 날짜/인원 요약 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
        <div className="grid grid-cols-2">
          <div className="p-3 border-r border-b border-gray-200">
            <p className="font-en text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1">체크인</p>
            <p className="text-sm font-medium">날짜 선택</p>
          </div>
          <div className="p-3 border-b border-gray-200">
            <p className="font-en text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1">체크아웃</p>
            <p className="text-sm font-medium">날짜 선택</p>
          </div>
          <div className="p-3 col-span-2">
            <p className="font-en text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1">인원</p>
            <p className="text-sm font-medium">인원 선택</p>
          </div>
        </div>
      </div>

      <Link
        href={`/booking/${property.id}/step-1`}
        className="block w-full bg-black text-white font-semibold rounded-full py-4 text-center text-[15px] hover:bg-gray-900 active:scale-[0.98] transition-all"
      >
        예약하기
      </Link>

      <p className="text-xs text-center text-gray-400 mt-3">
        지금 예약해도 요금이 청구되지 않습니다
      </p>
    </div>
  );
}
