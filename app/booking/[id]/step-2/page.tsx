import { notFound } from "next/navigation";
import BookingStepLayout from "@/components/booking/BookingStepLayout";
import GuestInfoForm from "@/components/booking/GuestInfoForm";
import BookingSummaryCard from "@/components/booking/BookingSummaryCard";
import { getPropertyById } from "@/lib/properties";

interface BookingStep2PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingStep2Page({ params }: BookingStep2PageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <BookingStepLayout currentStep={2} propertyId={id}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 예약자 정보 입력 */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight3 mb-6">
            예약자 정보를 입력해주세요
          </h2>
          <GuestInfoForm propertyId={id} />
        </div>

        {/* 예약 요약 */}
        <div>
          <BookingSummaryCard property={property} />
        </div>
      </div>
    </BookingStepLayout>
  );
}
