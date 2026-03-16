import PriceSummary from "./PriceSummary";
import type { Property } from "@/types/property";

interface FinalPriceSummaryProps {
  property: Property;
}

export default function FinalPriceSummary({ property }: FinalPriceSummaryProps) {
  return (
    <div className="space-y-4">
      <PriceSummary property={property} />
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="font-en text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
          Trust &amp; Safety
        </p>
        <ul className="space-y-1.5">
          {["결제 정보 암호화 (SSL/TLS)", "PCI DSS 보안 결제", "예약 완료 후 즉시 확인서 발송"].map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="text-black text-xs">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
