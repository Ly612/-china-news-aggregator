"use client";

import { useState } from "react";
import type { Event } from "@/lib/data";
import EventCard from "@/components/EventCard";

const PAGE_SIZE = 20;

interface HomeClientProps {
  events: Event[];
}

export default function HomeClient({ events }: HomeClientProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(events.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageEvents = events.slice(start, start + PAGE_SIZE);

  return (
    <>
      {/* ── Event count + page info ── */}
      <div className="mb-8 flex items-center justify-between opacity-0 animate-reveal-up">
        <span className="text-sm tabular-nums text-ash-500">
          {events.length} events
        </span>
        {totalPages > 1 && (
          <span className="text-sm tabular-nums text-ash-500">
            Page {page} / {totalPages}
          </span>
        )}
      </div>

      {/* ── Event list ── */}
      <div className="space-y-4">
        {pageEvents.map((event, i) => (
          <div
            key={event.id}
            className={`opacity-0 animate-reveal-up stagger-${Math.min(i + 1, 10)}`}
          >
            <EventCard event={event} index={start + i} />
          </div>
        ))}

        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-sm border border-ink-4 bg-ink-2">
              <svg
                className="h-6 w-6 text-ash-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <p className="font-display text-xl text-ash-300">
              No events found.
            </p>
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {/* Prev */}
          <button
            onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink-4/40 bg-ink-2/30 text-ash-400 transition-all duration-200 hover:border-gold/20 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-ink-4/40 disabled:hover:text-ash-400"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Page numbers */}
          {buildPageNumbers(page, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-1 text-xs text-ash-600">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => { setPage(p as number); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-sm px-2 text-sm tabular-nums transition-all duration-200 ${
                  page === p
                    ? "border border-gold/20 bg-gold/8 text-gold"
                    : "border border-ink-4/40 bg-ink-2/30 text-ash-400 hover:border-gold/20 hover:text-gold"
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink-4/40 bg-ink-2/30 text-ash-400 transition-all duration-200 hover:border-gold/20 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-ink-4/40 disabled:hover:text-ash-400"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Bottom rule ── */}
      <div className="mt-10 rule-gold opacity-40" />
    </>
  );
}

/** Build a compact page number array like [1, 2, 3, "...", 10] */
function buildPageNumbers(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Always show first page
  pages.push(1);

  if (current > 3) {
    pages.push("...");
  }

  // Pages around current
  const rangeStart = Math.max(2, current - 1);
  const rangeEnd = Math.min(total - 1, current + 1);
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  // Always show last page
  pages.push(total);

  return pages;
}
