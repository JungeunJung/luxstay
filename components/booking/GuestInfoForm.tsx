"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/hooks/useBookingStore";
import { validateGuestInfo } from "@/lib/validation";

interface GuestInfoFormProps {
  propertyId: string;
}

export default function GuestInfoForm({ propertyId }: GuestInfoFormProps) {
  const router = useRouter();
  const { setGuestInfo } = useBookingStore();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    specialRequest: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNext = () => {
    const validation = validateGuestInfo(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setGuestInfo(form);
    router.push(`/booking/${propertyId}/step-3`);
  };

  return (
    <div className="space-y-4">
      {/* 예약자명 */}
      <div>
        <label className="block font-en text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
          예약자 이름 *
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="홍길동"
          className="w-full text-sm text-black bg-gray-50 border-[1.5px] border-transparent rounded-xl px-3.5 py-[11px] outline-none focus:bg-white focus:border-black transition-all"
        />
        {errors.name && <p className="font-en text-11 text-gray-500 font-medium mt-1">{errors.name}</p>}
      </div>

      {/* 휴대폰 번호 */}
      <div>
        <label className="block font-en text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
          휴대폰 번호 *
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">☎</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="010-0000-0000"
            className="w-full text-sm text-black bg-gray-50 border-[1.5px] border-transparent rounded-xl pl-9 pr-3.5 py-[11px] outline-none focus:bg-white focus:border-black transition-all"
          />
        </div>
        {errors.phone && <p className="font-en text-11 text-gray-500 font-medium mt-1">{errors.phone}</p>}
      </div>

      {/* 이메일 */}
      <div>
        <label className="block font-en text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
          이메일 *
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="example@email.com"
          className="w-full text-sm text-black bg-gray-50 border-[1.5px] border-transparent rounded-xl px-3.5 py-[11px] outline-none focus:bg-white focus:border-black transition-all"
        />
        <p className="font-en text-11 text-gray-400 mt-1">예약 확인서가 이 이메일로 발송됩니다</p>
        {errors.email && <p className="font-en text-11 text-gray-500 font-medium mt-1">{errors.email}</p>}
      </div>

      {/* 특별 요청사항 */}
      <div>
        <label className="block font-en text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
          특별 요청사항 (선택)
        </label>
        <textarea
          rows={3}
          value={form.specialRequest}
          onChange={(e) => handleChange("specialRequest", e.target.value)}
          placeholder="체크인 시간, 특별 준비 등 요청사항을 입력해주세요"
          className="w-full text-sm text-black bg-gray-50 border-[1.5px] border-transparent rounded-xl px-3.5 py-[11px] outline-none resize-y focus:bg-white focus:border-black transition-all"
        />
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-black text-white font-semibold rounded-full py-4 text-[15px] hover:bg-gray-900 active:scale-[0.98] transition-all mt-2"
      >
        다음 단계로
      </button>
    </div>
  );
}
