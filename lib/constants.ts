import type { Amenity, PropertyType } from "@/types/property";

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "빌라", label: "빌라" },
  { value: "호텔", label: "호텔" },
  { value: "리조트", label: "리조트" },
  { value: "펜션", label: "펜션" },
  { value: "글램핑", label: "글램핑" },
];

export const SORT_OPTIONS = [
  { value: "recommended", label: "추천순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "price_desc", label: "가격 높은순" },
  { value: "rating", label: "평점순" },
];

export const PAYMENT_METHODS = [
  { value: "card", label: "신용카드 / 체크카드", icon: "💳" },
  { value: "kakaopay", label: "카카오페이", icon: "🟡" },
  { value: "naverpay", label: "네이버페이", icon: "🟢" },
];

export const AMENITY_ICONS: Partial<Record<Amenity, string>> = {
  "Wi-Fi": "📶",
  "주차": "🅿️",
  "수영장": "🏊",
  "스파": "♨️",
  "조식": "🍳",
  "에어컨": "❄️",
  "바베큐": "🔥",
  "반려동물 동반": "🐾",
  "바다 전망": "🌊",
  "산 전망": "⛰️",
  "자쿠지": "🛁",
  "헬스장": "💪",
};
