"use client";

import type { Event } from "@/lib/data";
import Timeline from "@/components/Timeline";

interface EventDetailClientProps {
  event: Event;
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-1.5 w-1.5 rounded-sm bg-gold" />
      <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-ash-300">
        {label}
      </h2>
      <div className="h-px flex-1 bg-ink-4/40" />
    </div>
  );
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
  return (
    <>
      {/* ── Timeline ── */}
      <section className="mb-12 opacity-0 animate-reveal-up stagger-3">
        <SectionHeading label="Timeline" />
        {event.sources.length > 0 ? (
          <Timeline sources={event.sources} />
        ) : (
          <div className="rounded-sm border border-dashed border-ink-4 py-12 text-center">
            <p className="text-sm text-ash-500">No sources available.</p>
          </div>
        )}
      </section>

      {/* ── Bottom rule ── */}
      <div className="rule-gold opacity-30" />
    </>
  );
}
