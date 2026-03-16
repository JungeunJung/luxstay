import { AMENITY_ICONS } from "@/lib/constants";
import type { Amenity } from "@/types/property";

interface AmenitiesListProps {
  amenities: Amenity[];
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">편의 시설</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2.5 py-3 px-4 bg-gray-50 rounded-xl">
            <span className="text-base">{AMENITY_ICONS[amenity] ?? "✦"}</span>
            <span className="text-sm font-medium">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
