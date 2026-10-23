// Explicitly approved archive representative. Never fill from source folders.
export const chamberArchiveItem = {
  title: "Puyallup Chamber of Commerce",
  descriptor: "Early event promotion and community storytelling",
  action: "View collection →",
  href: "/content/puyallup-chamber",
  video: "/assets/puyallup-chamber/chamber-door-preview.mp4",
  poster: "/assets/puyallup-chamber/chamber-door-poster.webp",
  alt: "The Puyallup Chamber of Commerce entrance door opening and closing",
  width: 720,
  height: 406,
  sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BXV4HskAEle/",
} as const;

// Seven completed exports approved by Shawn, in source-log order.
// Spin the Wheel and State Fair Pavilion remain incomplete and are excluded.
export const chamberVideos = [
  { slug: "welcome-to-the-chamber", title: "Welcome to the Chamber", src: chamberArchiveItem.video, poster: chamberArchiveItem.poster, width: 720, height: 406, sourceUrl: chamberArchiveItem.sourceUrl },
  { slug: "walmart-ribbon-cutting", title: "Walmart ribbon cutting", src: "/assets/puyallup-chamber/walmart-ribbon-cutting.mp4", poster: "/assets/puyallup-chamber/walmart-ribbon-cutting-poster.webp", width: 720, height: 720, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BXYK26rAxtC/" },
  { slug: "washington-state-fair-fireworks", title: "Washington State Fair fireworks", src: "/assets/puyallup-chamber/washington-state-fair-fireworks.mp4", poster: "/assets/puyallup-chamber/washington-state-fair-fireworks-poster.webp", width: 720, height: 406, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BYhrWeOHagE/" },
  { slug: "beverly-belles-throwback", title: "Beverly Belles throwback", src: "/assets/puyallup-chamber/beverly-belles-throwback.mp4", poster: "/assets/puyallup-chamber/beverly-belles-throwback-poster.webp", width: 720, height: 720, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BYmGdAsnwuG/" },
  { slug: "state-fair-dance-off", title: "State Fair dance off", src: "/assets/puyallup-chamber/state-fair-dance-off.mp4", poster: "/assets/puyallup-chamber/state-fair-dance-off-poster.webp", width: 720, height: 406, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BY4TQoVgYUT/" },
  { slug: "live-music", title: "Live music", src: "/assets/puyallup-chamber/live-music.mp4", poster: "/assets/puyallup-chamber/live-music-poster.webp", width: 720, height: 406, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BXbysARgquN/" },
  { slug: "washington-state-fair", title: "Washington State Fair", src: "/assets/puyallup-chamber/washington-state-fair.mp4", poster: "/assets/puyallup-chamber/washington-state-fair-poster.webp", width: 720, height: 406, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BZM-LpUHfwp/" },
] as const;
