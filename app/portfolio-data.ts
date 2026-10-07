// Curated public proof; detailed attribution and outcomes stay in case studies.
export const workGroups = [
  { id: "community-growth-activation", title: "Community Growth & Activation", items: [
    { slug: "ava-labs", title: "Building developer activation pathways from outreach to participation.", context: "Ava Labs · Developer Engagement Manager", image: "/assets/ava-elevate-developer-series.png", alt: "Elevate Developer Series program artwork", width: 1014, height: 566 },
    { slug: "cyber-metal-radio", title: "Creating recurring discovery and participation loops for a niche artist community.", context: "Web3 Metal / Cyber Metal Radio · Founder & Co-Founder", image: "/assets/cyber-metal-radio/station-dashboard.png", alt: "Cyber Metal Radio station and community programming interface", width: 1892, height: 917 },
  ] },
  { id: "content-creative-work", title: "Content Strategy & Creative Production", items: [
    { slug: "fight-legends", title: "Turning game development into a host-led content and community rhythm.", context: "Fight Legends · Community Manager & Marketing Lead", image: "/assets/fight-legends/dev-update-22-poster.png", alt: "Fight Legends development show featuring two presenters", width: 1280, height: 720 },
    { slug: "edge-of-company", title: "Extending long-form interviews through visual packaging and social distribution.", context: "Edge of Company · Podcast & Community Producer", image: "/assets/future-of-storytelling.jpeg", alt: "Edge of NFT Future of Storytelling episode thumbnail", width: 1280, height: 720 },
  ] },
] as const;

// Explicitly curated: one primary item per project or asset family.
// Different-artifact exceptions require Shawn's approval; never auto-fill gaps.
export const galleryItems = [
  { id: "artist-site", title: "r3plic4nt.com", descriptor: "Artist site · Creative & Visual Direction", image: "/assets/r3plic4nt-site-preview.jpg", alt: "r3plic4nt artist site’s industrial visual world", width: 1440, height: 900, href: "https://r3plic4nt.com/", action: "Visit live site", external: true },
  { id: "last-rehearsal", title: "The Last Rehearsal", descriptor: "Interactive game-story prototype · Early beta", image: "/assets/last-rehearsal-beta.png", alt: "The Last Rehearsal beta rehearsal room and case invitation", width: 679, height: 293, href: "https://replicant-case-01.r3plic4nt.chatgpt.site/", action: "Play external beta", external: true },
  { id: "edge-toonstar", title: "Edge of NFT · Toonstar", descriptor: "Custom episode thumbnail", image: "/assets/edge-of-company/edge-nft-toonstar.png", alt: "Edge of NFT Toonstar episode thumbnail", width: 1280, height: 720, href: "/assets/edge-of-company/edge-nft-toonstar.png", action: "View image", external: false },
  { id: "dadabots-prodigy", title: "DADABOTS · Prodigy vs NIN", descriptor: "Short-form edit & overlay", image: "/assets/web3-metal/dadabots-short-02-clean.png", alt: "DADABOTS Prodigy versus NIN short-form preview", width: 1080, height: 1920, href: "/assets/web3-metal/dadabots-prodigy-vs-nin.mp4", action: "Watch clip", external: false },
  { id: "fight-character-edit", title: "Fight Legends · Character-development edit", descriptor: "Motion/video edit · Unimplemented character concept", image: "/assets/fight-legends/character-development-edit-poster.jpg", alt: "Artist-created character model shown in the Fight Legends development edit", width: 1810, height: 1020, href: "/assets/fight-legends/character-development-edit.mp4", video: "/assets/fight-legends/character-development-edit.mp4", action: "Watch video", external: false },
  { id: "wave-warz", title: "Wave Warz · Featured battle performance visuals", descriptor: "Visual performance system for five featured battles", image: "/assets/wave-warz/featured-battles-poster.jpg", alt: "Wave Warz performance-feed visual system", width: 960, height: 540, href: "/content/wave-warz", preview: "/assets/wave-warz/featured-battles-trailer.mp4", action: "View collection", external: false },
] as const;
