"use client";

import { useState } from "react";
import type { Source } from "@/lib/data";
import { formatDateTime } from "@/lib/format";

interface TimelineProps {
  sources: Source[];
}

function TimelineItem({ source, index }: { source: Source; index: number }) {
  const isNonZh = source.lang !== "zh" && !!source.title_zh;
  const [showOriginal, setShowOriginal] = useState(false);

  // Display Chinese by default: for zh sources use title directly,
  // for non-zh sources use title_zh (translated), toggling shows original.
  const displayTitle = isNonZh && !showOriginal ? source.title_zh! : source.title;

  return (
    <div
      className={`group relative py-4 pl-10 opacity-0 animate-slide-right stagger-${Math.min(
        index + 1,
        8
      )}`}
    >
      {/* ── Node ── */}
      <div className="absolute left-0 top-[22px]">
        <div className="relative h-[11px] w-[11px] rounded-sm border-2 border-ink-1 bg-gold shadow-[0_0_8px_#c9a96e30] transition-all duration-300 group-hover:scale-125" />
      </div>

      {/* ── Dashed connector ── */}
      <div className="absolute left-[14px] top-[27px] h-px w-5 border-t border-dashed border-ink-4" />

      {/* ── Content card ── */}
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-sm border border-ink-4/50 bg-ink-2/60 px-5 py-4 transition-all duration-300 hover:bg-ink-2 hover:border-ink-4 hover:glow-gold"
      >
        {/* Row 1: source name + score + time */}
        <div className="mb-2 flex flex-wrap items-center gap-2.5">
          <span className="text-sm font-medium text-ash-300">
            {source.name}
          </span>
          <span className={`rounded-sm px-1.5 py-0.5 text-xs tabular-nums font-medium border ${scoreBadge(source.score)}`}>
            {source.score.toFixed(1)}
          </span>
          <span className="ml-auto text-sm tabular-nums text-ash-500">
            {formatDateTime(source.time)}
          </span>
        </div>

        {/* Title */}
        <p className="text-[15px] leading-relaxed text-ash-100 transition-colors group-hover:text-ash-50">
          {displayTitle}
        </p>

        {/* Translate toggle (only for non-zh sources with a translation) */}
        {isNonZh && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowOriginal((v) => !v);
            }}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-sm border border-ink-4/40 bg-ink-3/40 px-2.5 py-1 text-xs text-ash-400 transition-all duration-200 hover:border-gold/20 hover:text-gold"
          >
            {/* translate icon */}
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
              />
            </svg>
            {showOriginal ? "查看译文" : "查看原文"}
          </button>
        )}
      </a>
    </div>
  );
}

export default function Timeline({ sources }: TimelineProps) {
  const sorted = [...sources].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  return (
    <div className="relative ml-4">
      {/* ── Animated vertical gold line ── */}
      <div className="absolute left-[5px] top-3 bottom-3 w-px origin-top animate-grow-line bg-gradient-to-b from-gold/40 via-gold/15 to-transparent" />

      <div className="space-y-0">
        {sorted.map((source, i) => (
          <TimelineItem key={i} source={source} index={i} />
        ))}
      </div>
    </div>
  );
}

/** Return Tailwind classes for the score badge based on value */
function scoreBadge(score: number): string {
  if (score >= 4.0) return "border-gold/25 bg-gold/8 text-gold";
  if (score >= 3.0) return "border-ash-300/20 bg-ash-300/5 text-ash-300";
  return "border-ink-4/40 bg-ink-3/30 text-ash-500";
}
