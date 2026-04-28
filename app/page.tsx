import type { Metadata } from "next";
import { getAllEvents } from "@/lib/data";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "China Dispatch — Narrative Intelligence",
  description:
    "Track how Chinese and English media frame the same stories. Event-based narrative comparison across languages.",
  openGraph: {
    title: "China Dispatch — Narrative Intelligence",
    description:
      "Track how Chinese and English media frame the same stories. Event-based narrative comparison across languages.",
  },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const events = await getAllEvents();

  return (
    <>
      {/* ── Top gold rule ── */}
      <div className="rule-gold" />

      {/* ── Content ── */}
      <main className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-12">
        <HomeClient events={events} />
      </main>
    </>
  );
}
