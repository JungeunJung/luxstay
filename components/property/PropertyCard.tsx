"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import FavoriteButton from "@/components/ui/FavoriteButton";
import { formatPrice } from "@/lib/utils";
import { AMENITY_ICONS } from "@/lib/constants";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  layout?: "grid" | "list";
}

export default function PropertyCard({ property, layout = "grid" }: PropertyCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const hasMultiple = property.images.length > 1;
  const total = property.images.length;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgIdx((i) => (i - 1 + total) % total);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgIdx((i) => (i + 1) % total);
  };

  if (layout === "list") {
    return (
      <Link href={`/properties/${property.id}`} className="block group">
        <div className="bg-white border border-gray-100 rounded-20 overflow-hidden flex gap-0 hover:shadow-md hover:-translate-y-px transition-all duration-150 cursor-pointer">
          {/* 이미지 */}
          <div className="relative w-52 shrink-0 overflow-hidden">
            <Image
              src={property.images[imgIdx] ?? property.images[0]}
              alt={property.name}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
              sizes="208px"
              loading="lazy"
            />
            <div className="absolute top-2.5 left-2.5 flex gap-1.5">
              {property.badges?.slice(0, 2).map((badge) => (
                <Badge key={badge} variant={badgeVariant(badge)}>
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* 정보 */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <p className="font-en text-11 text-gray-400 uppercase tracking-wider mb-1">
                {property.region} · {property.subRegion}
              </p>
              <h3 className="text-15 font-bold text-black tracking-[-0.01em] mb-2">
                {property.name}
              </h3>
              <p className="text-13 text-gray-500 leading-relaxed line-clamp-2">
                {property.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              {/* 어메니티 */}
              <div className="flex gap-1.5 flex-wrap">
                {property.amenities.slice(0, 4).map((a) => (
                  <span
                    key={a}
                    className="font-en text-10 font-medium bg-gray-50 border border-gray-100 text-gray-500 rounded-full px-2.5 py-1"
                    title={a}
                  >
                    {AMENITY_ICONS[a] ?? "✦"} {a}
                  </span>
                ))}
              </div>

              <div className="text-right shrink-0 ml-4">
                <div className="flex items-center gap-1 justify-end mb-1">
                  <span className="text-10 text-gray-400">★</span>
                  <span className="font-en text-11 font-semibold">{property.rating}</span>
                  <span className="text-10 text-gray-400">({property.reviewCount})</span>
                </div>
                <span className="font-en text-base font-bold">
                  {formatPrice(property.pricePerNight)}
                </span>
                <span className="text-11 text-gray-400"> / 박</span>
              </div>
            </div>
          </div>

          {/* 즐겨찾기 */}
          <div className="absolute top-3 right-3">
            <FavoriteButton propertyId={property.id} />
          </div>
        </div>
      </Link>
    );
  }

  // ── Grid Layout ──
  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-20 overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-150 cursor-pointer">

        {/* 이미지 영역 */}
        <div
          className="relative overflow-hidden bg-gray-50"
          style={{ aspectRatio: "4/3" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* 현재 이미지 */}
          <Image
            src={property.images[imgIdx] ?? property.images[0]}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />

          {/* 그라디언트 오버레이 (하단) */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* 배지 — 좌상단 */}
          {property.badges && property.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-1.5">
              {property.badges.slice(0, 2).map((badge) => (
                <Badge key={badge} variant={badgeVariant(badge)}>
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* 즐겨찾기 — 우상단 */}
          <div className="absolute top-3 right-3">
            <FavoriteButton propertyId={property.id} />
          </div>

          {/* 좌우 화살표 버튼 */}
          {hasMultiple && hovered && (
            <>
              {imgIdx > 0 && (
                <button
                  onClick={prev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all z-10"
                  aria-label="이전 이미지"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M6.5 1.5L3 5l3.5 3.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
              {imgIdx < total - 1 && (
                <button
                  onClick={next}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all z-10"
                  aria-label="다음 이미지"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3.5 1.5L7 5l-3.5 3.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </>
          )}

          {/* 이미지 도트 인디케이터 */}
          {hasMultiple && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {property.images.slice(0, Math.min(total, 5)).map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-200 ${
                    i === imgIdx ? "w-3 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 정보 영역 */}
        <div className="p-4">
          {/* 위치 레이블 */}
          <p className="font-en text-11 text-gray-400 uppercase tracking-wider mb-1.5">
            {property.region} · {property.subRegion}
          </p>

          {/* 숙소명 */}
          <h3 className="text-15 font-bold text-black tracking-[-0.01em] mb-1 line-clamp-1">
            {property.name}
          </h3>

          {/* 어메니티 미리보기 */}
          <p className="text-13 text-gray-400 mb-3 line-clamp-1">
            {property.amenities.slice(0, 3).map((a) => AMENITY_ICONS[a] ?? "✦").join("  ")}
            {"  "}
            {property.amenities.slice(0, 3).join(" · ")}
          </p>

          {/* 가격 + 평점 */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-en text-base font-bold tabular-nums tracking-tighter2">
                {formatPrice(property.pricePerNight)}
              </span>
              <span className="text-11 font-normal text-gray-400 ml-0.5">/ 박</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-11 text-gray-800">★</span>
              <span className="font-en text-11 font-semibold text-black">{property.rating}</span>
              <span className="text-11 text-gray-400">({property.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function badgeVariant(badge: string): "black" | "outline" | "gray" | "muted" | "blue" {
  if (badge === "신규" || badge === "인기") return "black";
  if (badge === "특가") return "blue";
  if (badge === "프리미엄") return "muted";
  return "gray";
}
