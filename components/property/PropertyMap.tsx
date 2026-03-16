import type { Location } from "@/types/property";

interface PropertyMapProps {
  location: Location;
}

export default function PropertyMap({ location }: PropertyMapProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">위치</h2>
      <p className="text-sm text-gray-500 mb-4">{location.address}</p>
      {/* TODO: Kakao Maps 또는 Google Maps 임베드 */}
      <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-sm text-gray-400">지도를 불러오는 중...</p>
      </div>
    </div>
  );
}
