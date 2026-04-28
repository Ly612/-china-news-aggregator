import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventById } from "@/lib/data";
import { formatDate, formatRelative } from "@/lib/format";
import EventDetailClient from "./EventDetailClient";

export const dynamic = "force-dynamic";

interface EventPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEventById(params.id);
  if (!event) return {};

  const sourceNames = event.sources.map((s) => s.name).join(", ");

  return {
    title: event.title,
    description: event.title,
    openGraph: {
      type: "article",
      title: event.title,
      publishedTime: event.updated_at,
      modifiedTime: event.updated_at,
    },
    twitter: {
      card: "summary",
      title: event.title,
    },
    alternates: {
      canonical: `/event/${event.id}`,
    },
    other: {
      "article:published_time": event.updated_at,
      "article:section": "News",
    },
    keywords: [event.title, sourceNames, "news"],
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const total = event.sources.length;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: event.title,
    datePublished: event.updated_at,
    dateModified: event.updated_at,
    publisher: {
      "@type": "Organization",
      name: "News Dispatch",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/event/${event.id}`,
    },
    citation: event.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      publisher: { "@type": "Organization", name: s.name },
      url: s.url,
      datePublished: s.time,
    })),
  };

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-12">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Watermark */}
      <div className="watermark pointer-events-none absolute inset-0 overflow-hidden" />

      {/* ── Back link ── */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-3 rounded-sm border border-ink-4/40 bg-ink-2/30 px-4 py-2.5 text-sm text-ash-400 transition-all duration-300 hover:border-gold/20 hover:bg-ink-2/60 hover:text-gold"
        >
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>All Events</span>
        </Link>
      </nav>

      {/* ── Article ── */}
      <article>
        {/* Header */}
        <header className="relative mb-12 opacity-0 animate-reveal-up">
          {/* Meta row */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
            <time dateTime={event.updated_at} className="tabular-nums text-ash-400">
              {formatDate(event.updated_at)}
            </time>
            <span className="text-gold/25">/</span>
            <span className="text-ash-500">{formatRelative(event.updated_at)}</span>
            <span className="text-gold/25">/</span>
            <span className="text-gold/60">{total} sources</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl font-semibold leading-[1.15] tracking-tight text-ash-50 sm:text-5xl">
            {event.title}
          </h1>

          {/* Gradient divider */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/40 via-gold/15 to-transparent" />
        </header>

        {/* ── Client interactive sections ── */}
        <EventDetailClient event={event} />
      </article>
    </main>
  );
}
