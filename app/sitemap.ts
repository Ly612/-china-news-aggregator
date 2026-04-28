import type { MetadataRoute } from "next";
import { getAllEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chinadispatch.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getAllEvents();

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE_URL}/event/${event.id}`,
    lastModified: new Date(event.updated_at),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...eventEntries,
  ];
}
