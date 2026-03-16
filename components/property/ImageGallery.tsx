"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px] rounded-2xl overflow-hidden">
        {/* 메인 히어로 이미지 */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          {images[0] && (
            <Image
              src={images[0]}
              alt={`${title} 메인 이미지`}
              fill
              className="object-cover hover:opacity-95 transition-opacity"
              sizes="50vw"
              priority
            />
          )}
        </div>

        {/* 서브 이미지 4장 */}
        {images.slice(1, 5).map((image, i) => (
          <div
            key={i}
            className="relative cursor-pointer"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={image}
              alt={`${title} 이미지 ${i + 2}`}
              fill
              className="object-cover hover:opacity-90 transition-opacity"
              sizes="25vw"
              loading="lazy"
            />
            {/* 마지막 썸네일에 전체보기 오버레이 */}
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <p className="text-white text-sm font-semibold">
                  +{images.length - 5}장 더보기
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 라이트박스 */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          alt={title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
