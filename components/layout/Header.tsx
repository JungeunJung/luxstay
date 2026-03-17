"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/search/SearchBar";
import { Suspense } from "react";
import { formatPrice } from "@/lib/utils";

const PROPERTY_SECTIONS = [
  { id: "section-intro",     label: "숙소 소개" },
  { id: "section-host",      label: "호스트 정보" },
  { id: "section-amenities", label: "편의 시설" },
  { id: "section-map",       label: "위치" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [bookingBar, setBookingBar] = useState<{
    propertyId: string;
    price: number;
  } | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isPropertyDetailPath = pathname.startsWith("/properties/");

  /* ── click outside ── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── scroll (홈 검색바 감지) ── */
  useEffect(() => {
    const handleScroll = () => {
      if (isPropertyDetailPath) {
        setScrolled(false);
        return;
      }
      const searchSection = document.getElementById("search-section");
      if (searchSection) {
        const rect = searchSection.getBoundingClientRect();
        const isScrolled = rect.bottom < 64;
        setScrolled(isScrolled);
        if (!isScrolled) setSearchExpanded(false);
      } else {
        setScrolled(window.scrollY > 120);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPropertyDetailPath]);

  /* ── ESC ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchExpanded(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ── 상세 페이지: booking-widget IntersectionObserver ── */
  useEffect(() => {
    setBookingBar(null);
    setActiveSection(null);
    const timer = setTimeout(() => {
      const widget = document.getElementById("booking-widget");
      if (!widget) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            setBookingBar({
              propertyId: widget.dataset.propertyId ?? "",
              price: Number(widget.dataset.price ?? 0),
            });
          } else {
            setBookingBar(null);
          }
        },
        { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
      );
      observer.observe(widget);
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  /* ── 상세 페이지: 섹션 활성화 감지 ── */
  useEffect(() => {
    if (!bookingBar) return;
    const sectionIds = PROPERTY_SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-64px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [bookingBar]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const isPropertyPage = isPropertyDetailPath && !!bookingBar;

  return (
    <>
      {searchExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setSearchExpanded(false)}
        />
      )}

      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-white transition-all duration-300"
        style={{
          boxShadow: scrolled || isPropertyPage ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
          overflow: "visible",
        }}
      >
        {/* GNB 행 */}
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center gap-8">

          {/* 로고 */}
          <Link
            href="/"
            className={`font-en text-xl font-bold tracking-tightest text-black hover:text-gray-800 transition-all duration-300 shrink-0 ${
              isPropertyPage ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            LUXSTAY
          </Link>

          {/* 홈 — 스크롤 시 compact 검색바 */}
          <div
            className={`flex-1 max-w-lg mx-auto transition-all duration-300 ${
              scrolled && !searchExpanded && !isPropertyPage
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <button
              className="w-full text-left"
              onClick={() => setSearchExpanded(true)}
              aria-label="검색창 열기"
            >
              <Suspense>
                <SearchBar variant="gnb" />
              </Suspense>
            </button>
          </div>

          {/* 상세 페이지 — 섹션 탭 (좌측) */}
          <div
            className={`flex-1 flex items-center gap-1 transition-all duration-300 ${
              isPropertyPage
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            {PROPERTY_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                  activeSection === sec.id
                    ? "text-black font-semibold border-b-2 border-black rounded-none pb-[3px]"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* 상세 페이지 — 가격 + 예약하기 (우측) */}
          <div
            className={`flex items-center gap-4 transition-all duration-300 shrink-0 ${
              isPropertyPage
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            {bookingBar && (
              <>
                <div className="text-right">
                  <p className="font-en text-base font-bold text-black leading-none">
                    {formatPrice(bookingBar.price)}
                    <span className="text-gray-400 font-normal text-xs ml-1">/ 박</span>
                  </p>
                </div>
                <Link
                  href={`/booking/${bookingBar.propertyId}/step-1`}
                  className="bg-black text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-gray-900 active:scale-[0.97] transition-all whitespace-nowrap"
                >
                  예약하기
                </Link>
              </>
            )}
          </div>

          {/* 우측: 프로필 버튼 */}
          <div
            className={`flex justify-end transition-all duration-300 ${
              scrolled || isPropertyPage ? "" : "flex-1"
            } ${isPropertyPage ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100"}`}
          >
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all"
                aria-label="프로필"
                aria-expanded={menuOpen}
              >
                <img src="https://i.pravatar.cc/72" alt="프로필" className="w-full h-full object-cover" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white border border-gray-200 rounded-2xl shadow-lg py-1.5 overflow-hidden">
                  <button className="w-full text-left px-4 py-3 text-13 font-medium text-black hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>
                    예약 확인
                  </button>
                  <div className="h-px bg-gray-100 mx-3 my-1" />
                  <Link href="/" className="block px-4 py-3 text-13 font-medium text-black hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>
                    숙소 등록
                  </Link>
                  <button className="w-full text-left px-4 py-3 text-13 font-medium text-gray-500 hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>
                    도움말
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 확장된 검색바 (홈) */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            searchExpanded
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-3 pointer-events-none h-0"
          }`}
          style={{ overflow: "visible" }}
        >
          <div className="max-w-[1000px] mx-auto px-6 pb-5" style={{ overflow: "visible" }}>
            <Suspense>
              <SearchBar variant="compact" />
            </Suspense>
          </div>
        </div>
      </header>
    </>
  );
}
