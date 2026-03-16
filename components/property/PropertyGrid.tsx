import PropertyCard from "./PropertyCard";
import { getProperties } from "@/lib/properties";
import type { PropertyFilter } from "@/types/property";

interface PropertyGridProps {
  filters?: PropertyFilter;
}

export default async function PropertyGrid({ filters }: PropertyGridProps) {
  const properties = await getProperties(filters);

  if (properties.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-base">조건에 맞는 숙소가 없습니다.</p>
        <p className="text-sm text-gray-300 mt-2">필터를 변경해 다시 검색해보세요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

PropertyGrid.Skeleton = function PropertyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-20 overflow-hidden animate-pulse">
          <div className="h-36 bg-gray-100" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
