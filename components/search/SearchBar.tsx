"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  /** compact: GNB 내 임베드용 / default: 독립 히어로용 */
  variant?: "compact" | "default";
}

export default function SearchBar({ variant = "default" }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    router.push(`/?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow h-[72px] overflow-hidden">
        {/* 여행지 */}
        <div className="flex items-center px-6 gap-2 flex-1 min-w-0 group">
          <div className="min-w-0">
            <p className="font-en text-[11px] font-semibold text-black leading-none whitespace-nowrap">
              여행지
            </p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="어디로 떠나시나요?"
              className="w-full text-sm text-gray-400 bg-transparent outline-none placeholder:text-gray-400 font-medium mt-1"
            />
          </div>
        </div>

        {/* 체크인 */}
        <button className="hidden sm:flex flex-col items-start px-6 py-4 hover:bg-gray-50 transition-colors h-full">
          <span className="font-en text-[11px] font-semibold text-black leading-none whitespace-nowrap">
            체크인
          </span>
          <span className="text-sm text-gray-400 mt-1 whitespace-nowrap">날짜 추가</span>
        </button>

        {/* 체크아웃 */}
        <button className="hidden md:flex flex-col items-start px-6 py-4 hover:bg-gray-50 transition-colors h-full">
          <span className="font-en text-[11px] font-semibold text-black leading-none whitespace-nowrap">
            체크아웃
          </span>
          <span className="text-sm text-gray-400 mt-1 whitespace-nowrap">날짜 추가</span>
        </button>

        {/* 인원 + 검색 버튼 */}
        <div className="flex items-center gap-3 pl-6 pr-3">
          <div className="hidden sm:flex flex-col items-start">
            <span className="font-en text-[11px] font-semibold text-black leading-none whitespace-nowrap">
              여행자
            </span>
            <span className="text-sm text-gray-400 mt-1 whitespace-nowrap">인원 추가</span>
          </div>
          <button
            onClick={handleSearch}
            className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-900 active:scale-[0.97] transition-all shrink-0"
            aria-label="검색"
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.5" />
              <path d="M9.5 9.5L12.5 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-stretch bg-white rounded-full p-2 gap-2 max-w-2xl shadow-lg">
      {/* 지역 검색 */}
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-full">
        <span className="text-gray-400 text-sm shrink-0">📍</span>
        <div className="min-w-0">
          <p className="font-en text-10 font-medium uppercase tracking-wider text-gray-400 mb-0.5">
            어디로 가시나요?
          </p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="도시, 지역 검색"
            className="w-full text-13 text-black bg-transparent outline-none placeholder:text-gray-300 font-medium"
          />
        </div>
      </div>

      {/* 체크인/아웃 */}
      <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-full min-w-36">
        <span className="text-gray-400 text-sm shrink-0">📅</span>
        <div>
          <p className="font-en text-10 font-medium uppercase tracking-wider text-gray-400 mb-0.5">
            날짜
          </p>
          <p className="text-13 text-gray-300 font-medium">날짜 선택</p>
        </div>
      </div>

      {/* 인원 */}
      <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-full min-w-28">
        <span className="text-gray-400 text-sm shrink-0">👥</span>
        <div>
          <p className="font-en text-10 font-medium uppercase tracking-wider text-gray-400 mb-0.5">
            인원
          </p>
          <p className="text-13 text-gray-300 font-medium">인원 선택</p>
        </div>
      </div>

      {/* 검색 버튼 */}
      <button
        onClick={handleSearch}
        className="bg-black text-white font-semibold rounded-full px-6 py-3 text-13 hover:bg-gray-900 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.5" />
          <path d="M9.5 9.5L12.5 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>검색</span>
      </button>
    </div>
  );
}
