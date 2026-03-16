import Image from "next/image";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Property } from "@/types/property";

interface BookingSummaryCardProps {
  property: Property;
}

export default function BookingSummaryCard({ property }: BookingSummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* 숙소 이미지 */}
      <div className="relative h-36">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="p-5">
        <p className="font-en text-11 text-gray-400 uppercase tracking-wider mb-1">
          {property.type} · {property.region}
        </p>
        <h3 className="text-base font-bold mb-1">{property.name}</h3>
        <p className="text-sm text-gray-500">★ {property.rating} ({property.reviewCount}개 리뷰)</p>
      </div>
    </div>
  );
}
