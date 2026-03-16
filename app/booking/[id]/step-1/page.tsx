import { notFound } from "next/navigation";
import BookingStepLayout from "@/components/booking/BookingStepLayout";
import DateGuestSelector from "@/components/booking/DateGuestSelector";
import PriceSummary from "@/components/booking/PriceSummary";
import { getPropertyById } from "@/lib/properties";

interface BookingStep1PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingStep1Page({ params }: BookingStep1PageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <BookingStepLayout currentStep={1} propertyId={id}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 날짜 및 인원 선택 */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight3 mb-6">
            날짜 및 인원을 선택해주세요
          </h2>
          <DateGuestSelector propertyId={id} />
        </div>

        {/* 가격 요약 */}
        <div>
          <PriceSummary property={property} />
        </div>
      </div>
    </BookingStepLayout>
  );
}
