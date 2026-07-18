import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description = "Portfolio of Shawn Porter: growth systems, community programs, creator ecosystems, media production, and creative technology.";
  return {
    metadataBase: new URL(origin),
    title: { default: "Shawn Porter — Growth, Community & Creative Technology", template: "%s — Shawn Porter" },
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title: "Shawn Porter", description, type: "website", images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Shawn Porter portfolio" }] },
    twitter: { card: "summary_large_image", title: "Shawn Porter", description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
