"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import SearchBar from "@/components/search/SearchBar";
import { Suspense } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 검색 섹션(#search-section)이 뷰포트 위로 올라가면 GNB에 검색바 표시
      const searchSection = document.getElementById("search-section");
      if (searchSection) {
        const rect = searchSection.getBoundingClientRect();
        setScrolled(rect.bottom < 64);
      } else {
        setScrolled(window.scrollY > 120);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white transition-shadow duration-300"
      style={{ boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center gap-8">

        {/* 로고 */}
        <Link
          href="/"
          className="font-en text-xl font-bold tracking-tightest text-black hover:text-gray-800 transition-colors shrink-0"
        >
          LUXSTAY
        </Link>

        {/* 스크롤 시 나타나는 compact 검색바 */}
        <div
          className={`flex-1 max-w-lg mx-auto transition-all duration-300 ${
            scrolled
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <Suspense>
            <SearchBar variant="gnb" />
          </Suspense>
        </div>

        {/* 우측: 프로필 버튼 */}
        <div className={`flex justify-end transition-all duration-300 ${scrolled ? "" : "flex-1"}`}>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all"
              aria-label="프로필"
              aria-expanded={menuOpen}
            >
              <img
                src="https://i.pravatar.cc/72"
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </button>

            {/* 플로팅 드롭다운 */}
            {menuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white border border-gray-200 rounded-2xl shadow-lg py-1.5 overflow-hidden">
                <button
                  className="w-full text-left px-4 py-3 text-13 font-medium text-black hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  예약 확인
                </button>
                <div className="h-px bg-gray-100 mx-3 my-1" />
                <Link
                  href="/"
                  className="block px-4 py-3 text-13 font-medium text-black hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  숙소 등록
                </Link>
                <button
                  className="w-full text-left px-4 py-3 text-13 font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  도움말
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
