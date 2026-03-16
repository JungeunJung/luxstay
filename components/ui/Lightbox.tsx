"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, alt, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl w-10 h-10 flex items-center justify-center"
        onClick={onClose}
      >
        ✕
      </button>

      {/* 이미지 */}
      <div
        className="relative w-full max-w-5xl h-[80vh] mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {/* 네비게이션 */}
      <button
        className="absolute left-4 text-white/70 hover:text-white text-2xl w-12 h-12 flex items-center justify-center bg-white/10 rounded-full"
        onClick={(e) => { e.stopPropagation(); prev(); }}
      >
        ←
      </button>
      <button
        className="absolute right-4 text-white/70 hover:text-white text-2xl w-12 h-12 flex items-center justify-center bg-white/10 rounded-full"
        onClick={(e) => { e.stopPropagation(); next(); }}
      >
        →
      </button>

      {/* 카운터 */}
      <div className="absolute bottom-4 font-en text-xs text-white/50">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
