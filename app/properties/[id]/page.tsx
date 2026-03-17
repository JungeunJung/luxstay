import { notFound } from "next/navigation";
import ImageGallery from "@/components/property/ImageGallery";
import PropertyInfo from "@/components/property/PropertyInfo";
import AmenitiesList from "@/components/property/AmenitiesList";
import PropertyMap from "@/components/property/PropertyMap";
import BookingWidget from "@/components/booking/BookingWidget";
import { getPropertyById } from "@/lib/properties";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 py-8">
      {/* 이미지 갤러리 */}
      <ImageGallery images={property.images} title={property.name} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* 좌측: 숙소 정보 */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyInfo property={property} />
          <AmenitiesList amenities={property.amenities} />
          <PropertyMap location={property.location} />
        </div>

        {/* 우측: 예약 위젯 (sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <BookingWidget property={property} />
          </div>
        </div>
      </div>
    </main>
  );
}
