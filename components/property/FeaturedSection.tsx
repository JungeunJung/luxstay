import PropertyCard from "./PropertyCard";
import { getFeaturedProperties } from "@/lib/properties";

export default async function FeaturedSection() {
  const featured = await getFeaturedProperties();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-en text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
            Editor&apos;s Pick
          </p>
          <h2 className="text-2xl font-bold tracking-tight3">이번 주 추천 숙소</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
