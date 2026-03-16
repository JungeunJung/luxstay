import Link from "next/link";

interface BookingStepLayoutProps {
  children: React.ReactNode;
  currentStep: 1 | 2 | 3;
  propertyId: string;
}

const STEPS = [
  { number: 1, label: "날짜 · 인원" },
  { number: 2, label: "예약자 정보" },
  { number: 3, label: "결제" },
];

export default function BookingStepLayout({
  children,
  currentStep,
  propertyId,
}: BookingStepLayoutProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-8">
      {/* 뒤로가기 */}
      <Link
        href={currentStep === 1 ? `/properties/${propertyId}` : `/booking/${propertyId}/step-${currentStep - 1}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8"
      >
        ← 뒤로
      </Link>

      {/* 스텝 인디케이터 */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((step, i) => (
          <div key={step.number} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${currentStep >= step.number ? "opacity-100" : "opacity-30"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-en text-xs font-bold ${
                currentStep === step.number
                  ? "bg-black text-white"
                  : currentStep > step.number
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-400"
              }`}>
                {currentStep > step.number ? "✓" : step.number}
              </div>
              <span className={`text-sm font-medium ${currentStep === step.number ? "text-black" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-8 mx-1 ${currentStep > step.number ? "bg-black" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}
