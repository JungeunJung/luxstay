import { notFound } from "next/navigation";
import BookingStepLayout from "@/components/booking/BookingStepLayout";
import PaymentForm from "@/components/booking/PaymentForm";
import FinalPriceSummary from "@/components/booking/FinalPriceSummary";
import { getPropertyById } from "@/lib/properties";

interface BookingStep3PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingStep3Page({ params }: BookingStep3PageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <BookingStepLayout currentStep={3} propertyId={id}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 결제 수단 선택 */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight3 mb-6">
            결제 수단을 선택해주세요
          </h2>
          <PaymentForm propertyId={id} />
        </div>

        {/* 최종 금액 명세 */}
        <div>
          <FinalPriceSummary property={property} />
        </div>
      </div>
    </BookingStepLayout>
  );
}
