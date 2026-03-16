export type PropertyType = "빌라" | "호텔" | "리조트" | "펜션" | "글램핑";
export type Badge = "신규" | "인기" | "특가" | "프리미엄" | "마감 임박";
export type Amenity =
  | "Wi-Fi"
  | "주차"
  | "수영장"
  | "스파"
  | "조식"
  | "에어컨"
  | "바베큐"
  | "반려동물 동반"
  | "바다 전망"
  | "산 전망"
  | "자쿠지"
  | "헬스장";

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface Host {
  id: string;
  name: string;
  contact: string;
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  region: string;
  subRegion: string;
  location: Location;
  description: string;
  images: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  amenities: Amenity[];
  badges?: Badge[];
  host: Host;
  isFeatured?: boolean;
}

export interface PropertyFilter {
  location?: string;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
  sort?: "recommended" | "price_asc" | "price_desc" | "rating";
}
