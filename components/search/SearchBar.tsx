"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  variant?: "compact" | "gnb" | "default";
}

const POPULAR_DESTINATIONS = [
  { icon: "🏝️", name: "제주도", desc: "제주시 · 서귀포 · 애월" },
  { icon: "🌊", name: "부산", desc: "해운대 · 광안리 · 기장" },
  { icon: "🏙️", name: "서울", desc: "강남 · 종로 · 마포" },
  { icon: "🌿", name: "강원도", desc: "속초 · 강릉 · 평창" },
  { icon: "🏯", name: "경주", desc: "황남동 · 보문단지" },
  { icon: "🌸", name: "전주", desc: "한옥마을 · 덕진" },
];

const QUICK_DATES = ["오늘", "내일", "이번 주말", "다음 주말"];
const NIGHTS = ["1박", "2박", "3박", "5박", "7박", "14박"];
const GUEST_OPTIONS = [
  { label: "1명", value: 1 },
  { label: "2명", value: 2 },
  { label: "3명", value: 3 },
  { label: "4명", value: 4 },
  { label: "5명 이상", value: 5 },
];

type ActiveCell = "location" | "checkin" | "checkout" | "guests" | null;

const DROPDOWN_BASE = "absolute bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-gray-100 p-5 z-[9999]";

export default function SearchBar({ variant = "default" }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(0);
  const [activeCell, setActiveCell] = useState<ActiveCell>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSearch = (loc?: string) => {
    const params = new URLSearchParams();
    const q = loc ?? location;
    if (q) params.set("location", q);
    if (guests > 0) params.set("guests", String(guests));
    router.push(`/?${params.toString()}`);
    setActiveCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setActiveCell(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setActiveCell(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDest = location
    ? POPULAR_DESTINATIONS.filter((d) => d.name.includes(location) || d.desc.includes(location))
    : POPULAR_DESTINATIONS;

  /* ── GNB variant ── */
  if (variant === "gnb") {
    return (
      <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm h-10 overflow-hidden px-1">
        <div className="flex items-center px-3 flex-1 min-w-0">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="어디로 떠나시나요?"
            className="w-full text-xs text-black bg-transparent outline-none placeholder:text-gray-400 font-medium"
          />
        </div>
        <button
          onClick={() => handleSearch()}
          className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-900 active:scale-[0.97] transition-all shrink-0"
          aria-label="검색"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.5" />
            <path d="M9.5 9.5L12.5 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    );
  }

  /* ── Compact variant ── */
  if (variant === "compact") {
    return (
      <div ref={wrapperRef} className="relative" style={{ isolation: "isolate" }}>
        {/* 검색바 */}
        <div className={`flex items-center bg-white border h-[72px] rounded-full shadow-sm transition-all ${activeCell ? "border-gray-400 shadow-md" : "border-gray-200 hover:shadow-md"}`}>

          {/* 여행지 */}
          <div
            className={`flex items-center px-6 flex-1 min-w-0 cursor-text h-full rounded-l-full transition-colors ${activeCell === "location" ? "bg-gray-50" : "hover:bg-gray-50"}`}
            onMouseDown={(e) => { e.preventDefault(); setActiveCell("location"); }}
          >
            <div className="min-w-0 w-full">
              <p className="font-en text-[11px] font-semibold text-black leading-none">여행지</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setActiveCell("location")}
                onKeyDown={handleKeyDown}
                placeholder="어디로 떠나시나요?"
                className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400 font-medium mt-1"
              />
            </div>
          </div>

          <div className="w-px h-8 bg-gray-200 shrink-0" />

          {/* 체크인 */}
          <button
            type="button"
            className={`hidden sm:flex flex-col items-start px-6 h-full transition-colors ${activeCell === "checkin" ? "bg-gray-50" : "hover:bg-gray-50"}`}
            onClick={() => setActiveCell(activeCell === "checkin" ? null : "checkin")}
          >
            <span className="font-en text-[11px] font-semibold text-black leading-none">체크인</span>
            <span className={`text-sm mt-1 ${checkin ? "text-gray-800 font-medium" : "text-gray-400"}`}>
              {checkin || "날짜 추가"}
            </span>
          </button>

          <div className="hidden sm:block w-px h-8 bg-gray-200 shrink-0" />

          {/* 체크아웃 */}
          <button
            type="button"
            className={`hidden md:flex flex-col items-start px-6 h-full transition-colors ${activeCell === "checkout" ? "bg-gray-50" : "hover:bg-gray-50"}`}
            onClick={() => setActiveCell(activeCell === "checkout" ? null : "checkout")}
          >
            <span className="font-en text-[11px] font-semibold text-black leading-none">체크아웃</span>
            <span className={`text-sm mt-1 ${checkout ? "text-gray-800 font-medium" : "text-gray-400"}`}>
              {checkout || "날짜 추가"}
            </span>
          </button>

          <div className="hidden md:block w-px h-8 bg-gray-200 shrink-0" />

          {/* 여행자 + 검색 */}
          <div className="flex items-center gap-3 pl-6 pr-3">
            <button
              type="button"
              className="hidden sm:flex flex-col items-start"
              onClick={() => setActiveCell(activeCell === "guests" ? null : "guests")}
            >
              <span className="font-en text-[11px] font-semibold text-black leading-none">여행자</span>
              <span className={`text-sm mt-1 ${guests > 0 ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                {guests > 0 ? `${guests}명` : "인원 추가"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleSearch()}
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

        {/* 여행지 드롭다운 */}
        {activeCell === "location" && (
          <div className={`${DROPDOWN_BASE} top-[calc(100%+10px)] left-0 w-80`}>
            <p className="font-en text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {location ? "검색 결과" : "인기 여행지"}
            </p>
            {filteredDest.length === 0 ? (
              <p className="text-13 text-gray-400 py-2">검색 결과가 없습니다</p>
            ) : (
              <ul className="space-y-0.5">
                {filteredDest.map((dest) => (
                  <li key={dest.name}>
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                      onMouseDown={(e) => { e.preventDefault(); setLocation(dest.name); handleSearch(dest.name); }}
                    >
                      <span className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0">{dest.icon}</span>
                      <div>
                        <p className="text-13 font-semibold text-black">{dest.name}</p>
                        <p className="text-11 text-gray-400 mt-0.5">{dest.desc}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 체크인 드롭다운 */}
        {activeCell === "checkin" && (
          <div className={`${DROPDOWN_BASE} top-[calc(100%+10px)] left-[28%] w-72`}>
            <p className="font-en text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">체크인 날짜</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {QUICK_DATES.map((label) => (
                <button
                  type="button"
                  key={label}
                  className={`px-4 py-3 rounded-2xl border text-13 font-semibold transition-colors text-left ${checkin === label ? "border-black bg-black text-white" : "border-gray-200 text-black hover:border-gray-400"}`}
                  onClick={() => { setCheckin(label); setActiveCell("checkout"); }}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="date"
              className="w-full text-13 text-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-black transition-colors"
              onChange={(e) => { setCheckin(e.target.value); setActiveCell("checkout"); }}
            />
          </div>
        )}

        {/* 체크아웃 드롭다운 */}
        {activeCell === "checkout" && (
          <div className={`${DROPDOWN_BASE} top-[calc(100%+10px)] left-[48%] w-72`}>
            <p className="font-en text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">체크아웃 날짜</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {NIGHTS.map((label) => (
                <button
                  type="button"
                  key={label}
                  className={`py-3 rounded-2xl border text-13 font-semibold transition-colors text-center ${checkout === label ? "border-black bg-black text-white" : "border-gray-200 text-black hover:border-gray-400"}`}
                  onClick={() => { setCheckout(label); setActiveCell("guests"); }}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="date"
              className="w-full text-13 text-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-black transition-colors"
              onChange={(e) => { setCheckout(e.target.value); setActiveCell("guests"); }}
            />
          </div>
        )}

        {/* 인원 드롭다운 */}
        {activeCell === "guests" && (
          <div className={`${DROPDOWN_BASE} top-[calc(100%+10px)] right-0 w-60`}>
            <p className="font-en text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">여행자 인원</p>
            <ul className="space-y-0.5">
              {GUEST_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${guests === opt.value ? "bg-black text-white" : "hover:bg-gray-50 text-black"}`}
                    onClick={() => { setGuests(opt.value); setActiveCell(null); }}
                  >
                    <span className="text-13 font-semibold">{opt.label}</span>
                    {guests === opt.value && <span className="text-xs">✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  /* ── Default variant ── */
  return (
    <div className="flex items-stretch bg-white rounded-full p-2 gap-2 max-w-2xl shadow-lg">
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-full">
        <span className="text-gray-400 text-sm shrink-0">📍</span>
        <div className="min-w-0">
          <p className="font-en text-10 font-medium uppercase tracking-wider text-gray-400 mb-0.5">어디로 가시나요?</p>
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
      <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-full min-w-36">
        <span className="text-gray-400 text-sm shrink-0">📅</span>
        <div>
          <p className="font-en text-10 font-medium uppercase tracking-wider text-gray-400 mb-0.5">날짜</p>
          <p className="text-13 text-gray-300 font-medium">날짜 선택</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-full min-w-28">
        <span className="text-gray-400 text-sm shrink-0">👥</span>
        <div>
          <p className="font-en text-10 font-medium uppercase tracking-wider text-gray-400 mb-0.5">인원</p>
          <p className="text-13 text-gray-300 font-medium">인원 선택</p>
        </div>
      </div>
      <button
        onClick={() => handleSearch()}
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
