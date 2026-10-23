// Explicitly approved artifacts only. No folder scans or automatic selection.
const root = '/assets/edge-of-company/';
export const guestReel = { title: 'All Guest Intro Reel', src: root + 'guest-intro-reel-web.mp4', poster: root + 'guest-intro-reel-poster.jpg', width: 480, height: 856 };
export const artBasel = [
  { title: 'Ed Zipco & Gmoney', src: root + 'art-basel-ed-zipco-gmoney.jpg', width: 766, height: 431 },
  { title: 'Benzi', src: root + 'edge-nft-art-basel-benzi.png', width: 610, height: 344 },
  { title: 'Adam Charles', src: root + 'edge-nft-art-basel-adam.png', width: 614, height: 346 },
] as const;
export const interviewPresentation = [
  { title: 'Hot Topics overlay variation', src: root + 'interview-overlay-hot-topics.jpg', width: 1600, height: 897 },
  { title: 'Vertical interview adaptation', src: root + 'interview-social-adaptation.jpg', width: 428, height: 760 },
] as const;
export const packaging = [
  { title: 'Future of Storytelling', src: '/assets/future-of-storytelling.jpeg', width: 1280, height: 720 },
  { title: 'SWOOPS', src: '/assets/swoops-episode.jpeg', width: 680, height: 383 },
  { title: 'Edge of AI launch', src: '/assets/edge-of-ai-launch.jpeg', width: 680, height: 383 },
] as const;
export const socialRollout = [
  { title: 'Gala Games giveaway post', src: root + 'social-rollout-gala.jpg', width: 538, height: 718 },
  { title: 'FWB Fest interview post', src: root + 'social-rollout-fwb.jpg', width: 530, height: 536 },
] as const;
