export const web3MetalVideos = [
  { id: "prodigy-vs-nin", title: "DADABOTS · Prodigy vs NIN", role: "Short-form edit · Overlay design · Publishing", src: "/assets/web3-metal/dadabots-prodigy-vs-nin.mp4", poster: "/assets/web3-metal/dadabots-short-02-clean.png", width: 1080, height: 1920 },
  { id: "atari-vs-aphex", title: "Atari Teenage Riot vs Aphex Twin", role: "Short-form edit · Overlay design · Publishing", src: "/assets/web3-metal/dadabots-atari-vs-aphex.mp4", poster: "/assets/web3-metal/dadabots-short-01-clean.png", width: 1080, height: 1920 },
  { id: "suno-mashup", title: "Suno Mashup walkthrough", role: "Concept, production, filming, editing & publishing", src: "/assets/web3-metal/suno-mashup-walkthrough-web.mp4", poster: "/assets/web3-metal/suno-mashup-walkthrough-poster.jpg", width: 720, height: 1280 },
  { id: "music-monday", title: "Web3 Metal weekly music / release-preview video", role: "Music / release-preview video", src: "/assets/web3-metal/music-monday-web.mp4", poster: "/assets/web3-metal/music-monday-poster.jpg", width: 1280, height: 720 },
] as const;

// Manually replace this one record for each selected issue; no automatic latest-item lookup.
// A future newsletter website can replace href without changing the collection layout.
export const newsletterItem = {
  title: "What Happens After Someone Buys the Song?",
  descriptor: "Web3 Metal newsletter · Issue 32",
  cover: "/assets/web3-metal/newsletter-issue-32.jpg",
  width: 1600,
  height: 900,
  href: "https://web3metal.beehiiv.com/p/what-happens-after-someone-buys-the-song-056c",
  action: "Read on Beehiiv ↗",
} as const;
