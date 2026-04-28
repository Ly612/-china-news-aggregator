import type { Metadata } from "next";
import "@/styles/globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chinadispatch.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "China Dispatch — Narrative Intelligence",
    template: "%s | China Dispatch",
  },
  description:
    "Track how Chinese and English media frame the same stories. Event-based narrative intelligence across languages.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "China Dispatch",
    title: "China Dispatch — Narrative Intelligence",
    description:
      "Track how Chinese and English media frame the same stories. Event-based narrative intelligence across languages.",
  },
  twitter: {
    card: "summary",
    title: "China Dispatch — Narrative Intelligence",
    description:
      "Track how Chinese and English media frame the same stories. Event-based narrative intelligence across languages.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink-0 font-body">
        {children}
      </body>
    </html>
  );
}
