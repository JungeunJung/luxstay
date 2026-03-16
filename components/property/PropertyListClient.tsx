"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import { PROPERTY_TYPES, SORT_OPTIONS } from "@/lib/constants";
import type { Property, PropertyType } from "@/types/property";

interface PropertyListClientProps {
  allProperties: Property[];
  featuredProperties: Property[];
}

type SortValue = "recommended" | "price_asc" | "price_desc" | "rating";

export default function PropertyListClient({
  allProperties,
  featuredProperties,
}: PropertyListClientProps) {
  const [activeType, setActiveType] = useState<PropertyType | "">("");
  const [activeSort, setActiveSort] = useState<SortValue>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = allProperties
    .filter((p) => (activeType ? p.type === activeType : true))
    .sort((a, b) => {
      if (activeSort === "price_asc") return a.pricePerNight - b.pricePerNight;
      if (activeSort === "price_desc") return b.pricePerNight - a.pricePerNight;
      if (activeSort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div>
      {/* ── 추천 섹션 ── */}
      {featuredProperties.length > 0 && (
        <div className="mb-14">
          <div className="mb-6">
            <p className="font-en text-11 font-medium uppercase tracking-wider text-gray-400 mb-1">
              Editor's Pick
            </p>
            <h2 className="text-2xl font-bold tracking-tight3">이번 주 추천 숙소</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}

      {/* ── 전체 목록 헤더 ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight3">전체 숙소</h2>
          <p className="text-13 text-gray-400 mt-0.5">{filtered.length}개 숙소</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* 타입 필터 */}
          <div className="flex gap-1.5 flex-wrap">
            {PROPERTY_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setActiveType(activeType === t.value ? "" : t.value)}
                className={`font-en text-11 font-medium rounded-full px-3 py-[5px] border transition-all ${
                  activeType === t.value
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 구분선 */}
          <div className="hidden sm:block h-4 w-px bg-gray-200" />

          {/* 정렬 */}
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value as SortValue)}
            className="font-en text-11 text-black bg-gray-50 border-[1.5px] border-transparent rounded-xl px-3 py-2 outline-none focus:bg-white focus:border-black cursor-pointer transition-all"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* 뷰 전환 */}
          <div className="flex gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100">
            <button
              onClick={() => setViewMode("grid")}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                viewMode === "grid" ? "bg-black text-white" : "text-gray-400 hover:text-gray-600"
              }`}
              aria-label="그리드 보기"
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                viewMode === "list" ? "bg-black text-white" : "text-gray-400 hover:text-gray-600"
              }`}
              aria-label="리스트 보기"
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {/* ── 카드 목록 ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 border border-gray-100 rounded-20">
          <p className="text-gray-400 text-base mb-2">조건에 맞는 숙소가 없습니다.</p>
          <p className="text-13 text-gray-300">필터를 변경해 다시 검색해보세요.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="2" width="12" height="2.5" rx="1" fill="currentColor" />
      <rect x="1" y="6" width="12" height="2.5" rx="1" fill="currentColor" />
      <rect x="1" y="10" width="12" height="2.5" rx="1" fill="currentColor" />
    </svg>
  );
}
