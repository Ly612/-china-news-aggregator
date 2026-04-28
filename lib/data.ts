import resultData from "@/result.json";

export interface Source {
  name: string;
  lang: "zh" | "other";
  title: string;
  /** Chinese translation of title (for non-zh sources) */
  title_zh?: string;
  url: string;
  time: string;
  /** Importance score */
  score: number;
}

export interface Event {
  id: string;
  title: string;
  updated_at: string;
  sources: Source[];
  /** Average importance score across all sources */
  avgScore: number;
}

/* ──────────────────────────────────────────────
   Domain → display name mapping
   ────────────────────────────────────────────── */

const DOMAIN_NAMES: Record<string, string> = {
  "ptinews.com": "PTI News",
  "jagran.com": "Jagran",
  "timesofindia.indiatimes.com": "Times of India",
  "hindustantimes.com": "Hindustan Times",
  "divyabhaskar.co.in": "Divya Bhaskar",
  "thehindu.com": "The Hindu",
  "aajtak.in": "Aaj Tak",
  "indianexpress.com": "Indian Express",
  "news.detik.com": "Detik News",
  "yomiuri.co.jp": "Yomiuri Shimbun",
  "ndtv.com": "NDTV",
  "news.abplive.com": "ABP News",
  "abplive.com": "ABP Live",
  "firstpost.com": "Firstpost",
  "nasional.sindonews.com": "Sindo News",
  "newsdig.tbs.co.jp": "TBS News",
  "tribunnews.com": "Tribun News",
  "20.detik.com": "20Detik",
  "jakartaglobe.id": "Jakarta Globe",
  "liputan6.com": "Liputan6",
};

function extractSourceName(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (DOMAIN_NAMES[host]) return DOMAIN_NAMES[host];
    // Fallback: capitalize domain parts
    const parts = host.split(".");
    const name = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return "Unknown";
  }
}

/** Detect if a string contains Chinese characters */
function isChinese(text: string): boolean {
  return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text);
}

/* ──────────────────────────────────────────────
   Transform result.json into Event[]
   ────────────────────────────────────────────── */

interface RawItem {
  event_id: string;
  title: string;
  timestamp: string;
  url: string;
  score: string;
  translated_title: string;
}

type RawData = Record<string, RawItem[]>;

function buildEvents(raw: RawData): Event[] {
  return Object.entries(raw).map(([eventId, items]) => {
    // Sort sources by timestamp ascending (earliest first)
    const sorted = [...items].sort(
      (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)
    );

    // Event title = earliest source's translated_title (Chinese)
    const earliest = sorted[0];
    const eventTitle = earliest.translated_title || earliest.title;

    // Latest timestamp for updated_at
    const latest = sorted[sorted.length - 1];
    const updatedAt = new Date(parseInt(latest.timestamp)).toISOString();

    // Build sources
    const sources: Source[] = sorted.map((item) => {
      const isZh = isChinese(item.title);
      return {
        name: extractSourceName(item.url),
        lang: isZh ? "zh" : "other",
        title: item.title,
        title_zh: isZh ? undefined : item.translated_title,
        url: item.url,
        time: new Date(parseInt(item.timestamp)).toISOString(),
        score: parseFloat(item.score) || 0,
      };
    });

    // Average score
    const avgScore =
      sources.length > 0
        ? Math.round(
            (sources.reduce((sum, s) => sum + s.score, 0) / sources.length) *
              10
          ) / 10
        : 0;

    return {
      id: eventId,
      title: eventTitle,
      updated_at: updatedAt,
      sources,
      avgScore,
    };
  });
}

const ALL_EVENTS = buildEvents(resultData as unknown as RawData);

/* ──────────────────────────────────────────────
   Public API
   ────────────────────────────────────────────── */

export async function getAllEvents(): Promise<Event[]> {
  // Sort: events with more sources first, then by updated_at desc
  return [...ALL_EVENTS].sort((a, b) => {
    if (b.sources.length !== a.sources.length) {
      return b.sources.length - a.sources.length;
    }
    return (
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  });
}

export async function getEventById(id: string): Promise<Event | undefined> {
  return ALL_EVENTS.find((e) => e.id === id);
}
