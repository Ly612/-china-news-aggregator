import Link from "next/link";
import type { Event } from "@/lib/data";
import { formatDate, formatRelative } from "@/lib/format";

interface EventCardProps {
  event: Event;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const total = event.sources.length;

  return (
    <Link href={`/event/${event.id}`}>
      <article className="group relative card-lift rounded-sm border border-ink-4/50 bg-ink-1 overflow-hidden">
        {/* ── Top gold accent line on hover ── */}
        <div className="absolute inset-x-0 top-0 h-px bg-gold/0 transition-all duration-500 group-hover:bg-gold/30" />

        {/* ── Index number ── */}
        <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center bg-ink-3/50 text-xs tabular-nums text-ash-500 border-r border-b border-ink-4/40">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="p-5 pl-14 sm:p-6 sm:pl-16">
          {/* ── Row 1: Meta ── */}
          <div className="mb-2.5 flex flex-wrap items-center gap-3 text-xs text-ash-400">
            <time className="tabular-nums">
              {formatDate(event.updated_at)}
            </time>
            <span className="text-gold/30">/</span>
            <span className="text-ash-500">{formatRelative(event.updated_at)}</span>
            <span className="text-gold/30">/</span>
            <span className="text-ash-500">{total} sources</span>
            <span className="text-gold/30">/</span>
            <span className={`tabular-nums font-medium ${scoreColor(event.avgScore)}`}>
              {event.avgScore.toFixed(1)}
            </span>
          </div>

          {/* ── Row 2: Title ── */}
          <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-ash-50 transition-colors duration-300 group-hover:text-gold-bright sm:text-[28px]">
            {event.title}
          </h2>

          {/* ── Row 3: Source chips ── */}
          {total > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {event.sources.slice(0, 5).map((s, i) => (
                <span
                  key={i}
                  className="rounded-sm px-2.5 py-1 text-xs uppercase tracking-[0.06em] border border-gold/15 bg-gold/5 text-ash-300 transition-colors duration-200 group-hover:bg-gold/10 group-hover:text-ash-100"
                >
                  {s.name}
                </span>
              ))}
              {event.sources.length > 5 && (
                <span className="px-1.5 text-xs text-ash-500">
                  +{event.sources.length - 5}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Right arrow ── */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 translate-x-[-6px] opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold/20 bg-ink-3/60">
            <svg
              className="h-3.5 w-3.5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

/** Return a Tailwind color class based on score value */
function scoreColor(score: number): string {
  if (score >= 4.0) return "text-gold";
  if (score >= 3.0) return "text-ash-300";
  return "text-ash-500";
}
