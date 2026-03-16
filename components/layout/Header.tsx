"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center">

        {/* 로고 — 좌측 */}
        <Link
          href="/"
          className="font-en text-xl font-bold tracking-tightest text-black hover:text-gray-800 transition-colors shrink-0"
        >
          LUXSTAY
        </Link>

        {/* 우측: 프로필 버튼 */}
        <div className="flex-1 flex justify-end">
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
