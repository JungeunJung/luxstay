"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PROPERTY_TYPES } from "@/lib/constants";

const CATEGORY_ICONS: Record<string, string> = {
  빌라: "🏡",
  호텔: "🏨",
  리조트: "🌴",
  펜션: "🏕️",
  글램핑: "⛺",
};

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="sticky top-20 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3 -mb-px">
            {/* 전체 탭 */}
            <button
              onClick={() => updateFilter("type", "")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all shrink-0 border-b-2 ${
                currentType === ""
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">🏠</span>
              <span className="font-en text-[11px] font-medium whitespace-nowrap">전체</span>
            </button>

            {PROPERTY_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => updateFilter("type", currentType === type.value ? "" : type.value)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all shrink-0 border-b-2 ${
                  currentType === type.value
                    ? "border-black text-black"
                    : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="text-xl">{CATEGORY_ICONS[type.value]}</span>
                <span className="font-en text-[11px] font-medium whitespace-nowrap">{type.label}</span>
              </button>
            ))}
          </div>
      </div>
    </div>
  );
}
