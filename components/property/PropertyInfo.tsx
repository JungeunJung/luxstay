import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types/property";
import ExpandableText from "@/components/property/ExpandableText";

interface PropertyInfoProps {
  property: Property;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div>
      <p className="font-en text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
        {property.type} · {property.region}
      </p>
      <h1 className="text-4xl font-bold tracking-tight2 mb-4">{property.name}</h1>

      <div className="flex items-center gap-4 mb-6">
        <span className="font-en text-sm">★ {property.rating}</span>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-500">리뷰 {property.reviewCount}개</span>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-500">{property.location.address}</span>
      </div>

      <div className="flex items-baseline gap-2 mb-8">
        <span className="font-en text-xl font-bold">{formatPrice(property.pricePerNight)}</span>
        <span className="text-sm text-gray-400">/ 박</span>
      </div>

      {/* 숙소 소개 */}
      <div id="section-intro">
        <h2 className="text-xl font-bold mb-3">숙소 소개</h2>
        <ExpandableText text={property.description} />
      </div>

      {/* 호스트 정보 */}
      <div id="section-host" className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-3">호스트 정보</h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-500">
            {property.host.name[0]}
          </div>
          <div>
            <p className="font-semibold">{property.host.name}</p>
            <p className="text-sm text-gray-500">{property.host.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}