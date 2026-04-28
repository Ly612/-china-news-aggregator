import type { Source } from "@/lib/data";
import { formatDateTime } from "@/lib/format";

interface SourceListProps {
  sources: Source[];
  emptyMessage?: string;
}

export default function SourceList({
  sources,
  emptyMessage = "No sources available.",
}: SourceListProps) {
  if (sources.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-ink-4 py-10 text-center">
        <p className="text-sm text-ash-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sources.map((source, i) => (
        <a
          key={i}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 rounded-sm border border-ink-4/40 bg-ink-2/30 p-4 transition-all duration-300 hover:bg-ink-2/80 hover:border-ink-4 hover:glow-gold"
        >
          <div className="min-w-0 flex-1">
            {/* Title */}
            <p className="text-[15px] font-medium leading-snug text-ash-100 transition-colors group-hover:text-ash-50 line-clamp-2">
              {source.title}
            </p>
            {/* Meta row */}
            <div className="mt-2 flex items-center gap-2 text-sm text-ash-400">
              <span className="font-medium">
                {source.name}
              </span>
              <span className="text-gold/25">/</span>
              <time className="tabular-nums text-ash-500">
                {formatDateTime(source.time)}
              </time>
            </div>
          </div>

          {/* ── External link icon ── */}
          <svg
            className="mt-1 h-4 w-4 shrink-0 text-ash-600 transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </a>
      ))}
    </div>
  );
}
