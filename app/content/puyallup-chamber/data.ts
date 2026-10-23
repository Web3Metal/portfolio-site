// Explicitly approved Gallery representative. Never fill from source folders.
export const chamberGalleryItem = {
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
  { slug: "welcome-to-the-chamber", title: "Welcome to the Chamber", src: chamberGalleryItem.video, poster: chamberGalleryItem.poster, width: 720, height: 406, sourceUrl: chamberGalleryItem.sourceUrl },
  { slug: "walmart-ribbon-cutting", title: "Walmart ribbon cutting", src: "/assets/puyallup-chamber/walmart-ribbon-cutting.mp4", poster: "/assets/puyallup-chamber/walmart-ribbon-cutting-poster.webp", width: 720, height: 720, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BXYK26rAxtC/" },
  { slug: "washington-state-fair-fireworks", title: "Washington State Fair fireworks", src: "/assets/puyallup-chamber/washington-state-fair-fireworks.mp4", poster: "/assets/puyallup-chamber/washington-state-fair-fireworks-poster.webp", width: 720, height: 406, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BYhrWeOHagE/" },
  { slug: "beverly-belles-throwback", title: "Beverly Belles throwback", src: "/assets/puyallup-chamber/beverly-belles-throwback.mp4", poster: "/assets/puyallup-chamber/beverly-belles-throwback-poster.webp", width: 720, height: 720, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BYmGdAsnwuG/" },
  { slug: "state-fair-dance-off", title: "State Fair dance off", src: "/assets/puyallup-chamber/state-fair-dance-off.mp4", poster: "/assets/puyallup-chamber/state-fair-dance-off-poster.webp", width: 720, height: 406, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BY4TQoVgYUT/" },
  { slug: "live-music", title: "Live music", src: "/assets/puyallup-chamber/live-music.mp4", poster: "/assets/puyallup-chamber/live-music-poster.webp", width: 720, height: 406, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BXbysARgquN/" },
  { slug: "washington-state-fair", title: "Washington State Fair", src: "/assets/puyallup-chamber/washington-state-fair.mp4", poster: "/assets/puyallup-chamber/washington-state-fair-poster.webp", width: 720, height: 406, sourceUrl: "https://www.instagram.com/puyallupsumnerchamber/reel/BZM-LpUHfwp/" },
] as const;

// Six stills explicitly approved by Shawn. No verified post permalinks are available.
export const chamberStills = [
  {
    slug: "farm-guide", title: "Farm guide",
    annotation: "Highlights a local guide as a resource for discovering farms and nearby activities.",
    src: "/assets/puyallup-chamber/farm-guide.webp",
    alt: "A printed farm guide with an illustrated farm scene on its cover.",
    width: 800, height: 800,
  },
  {
    slug: "local-vehicle-display", title: "Local vehicle display",
    annotation: "Brings a local gathering into the Chamber’s feed through a scene from the event.",
    src: "/assets/puyallup-chamber/local-vehicle-display.webp",
    alt: "Vehicles and visitors gathered at an outdoor display beneath trees.",
    width: 800, height: 800,
  },
  {
    slug: "business-ribbon-cutting", title: "Business ribbon cutting",
    annotation: "Introduces a local business through its ribbon cutting and a glimpse of the shop.",
    src: "/assets/puyallup-chamber/business-ribbon-cutting.webp",
    alt: "Consignment by Victoria ribbon cutting collage with shop displays and refreshments.",
    width: 800, height: 800,
  },
  {
    slug: "rodeo-giveaway", title: "Rodeo giveaway",
    annotation: "Turns a rodeo ticket giveaway into a direct invitation to participate.",
    src: "/assets/puyallup-chamber/rodeo-giveaway.webp",
    alt: "Rodeo giveaway collage showing tickets, merchandise, and an invitation to enter.",
    width: 800, height: 800,
  },
  {
    slug: "oktoberfest-promotion", title: "Oktoberfest promotion",
    annotation: "Combines event details with a social photo to promote a local celebration.",
    src: "/assets/puyallup-chamber/oktoberfest-promotion.webp",
    alt: "Oktoberfest event flyer above a group photo.",
    width: 800, height: 800,
  },
  {
    slug: "deli-spotlight", title: "Deli spotlight",
    annotation: "Spotlights a local business with a recognizable storefront detail.",
    src: "/assets/puyallup-chamber/deli-spotlight.webp",
    alt: "Sparks Firehouse Deli logo on a storefront window.",
    width: 800, height: 800,
  },
] as const;
