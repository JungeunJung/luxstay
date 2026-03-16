import type { GuestInfo } from "@/types/booking";

interface ValidationResult {
  isValid: boolean;
  errors: Partial<GuestInfo>;
}

export function validateGuestInfo(form: GuestInfo): ValidationResult {
  const errors: Partial<GuestInfo> = {};

  if (!form.name.trim()) {
    errors.name = "예약자 이름을 입력해주세요";
  } else if (form.name.trim().length < 2) {
    errors.name = "이름은 2자 이상 입력해주세요";
  }

  const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
  if (!form.phone.trim()) {
    errors.phone = "휴대폰 번호를 입력해주세요";
  } else if (!phoneRegex.test(form.phone.replace(/\s/g, ""))) {
    errors.phone = "올바른 휴대폰 번호를 입력해주세요 (예: 010-1234-5678)";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = "이메일 주소를 입력해주세요";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "올바른 이메일 주소를 입력해주세요";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
