import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PriceSummaryProps {
  property: Property;
  nights?: number;
}

export default function PriceSummary({ property, nights = 1 }: PriceSummaryProps) {
  const subtotal = property.pricePerNight * nights;
  const tax = Math.round(subtotal * 0.1);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + tax + serviceFee;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <p className="font-en text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
        요금 요약
      </p>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{formatPrice(property.pricePerNight)} × {nights}박</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">세금 (10%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">서비스 수수료</span>
          <span className="font-medium">{formatPrice(serviceFee)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-bold">합계</span>
          <span className="font-en font-bold text-lg">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
