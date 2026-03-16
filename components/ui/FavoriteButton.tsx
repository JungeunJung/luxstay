"use client";

import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  propertyId?: string;
  variant?: "card" | "header";
}

export default function FavoriteButton({ propertyId, variant = "card" }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites(propertyId);

  if (variant === "header") {
    return (
      <button className="w-9 h-9 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-xl hover:border-gray-400 transition-all text-sm">
        ♡
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (propertyId) toggle();
      }}
      className="w-8 h-8 flex items-center justify-center transition-all"
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 검정 반투명 채움 */}
        <path
          d="M14 22.5C14 22.5 5 17 5 10.5C5 7.46 7.46 5 10.5 5C12.14 5 13.6 5.74 14 6.5C14.4 5.74 15.86 5 17.5 5C20.54 5 23 7.46 23 10.5C23 17 14 22.5 14 22.5Z"
          fill="rgba(0,0,0,0.65)"
        />
        {/* 흰색 아웃라인 */}
        <path
          d="M14 22.5C14 22.5 5 17 5 10.5C5 7.46 7.46 5 10.5 5C12.14 5 13.6 5.74 14 6.5C14.4 5.74 15.86 5 17.5 5C20.54 5 23 7.46 23 10.5C23 17 14 22.5 14 22.5Z"
          fill={isFavorite ? "white" : "none"}
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
