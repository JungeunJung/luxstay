"use client";

import { useState } from "react";

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
}

export default function ExpandableText({ text }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const paragraphs = text.split("\n\n").filter(Boolean);
  const preview = paragraphs[0];
  const hasMore = paragraphs.length > 1;

  return (
    <div>
      <div className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
        {expanded ? text : preview}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm font-semibold text-black underline underline-offset-2 hover:text-gray-600 transition-colors"
        >
          {expanded ? "접기" : "더 보기"}
        </button>
      )}
    </div>
  );
}
