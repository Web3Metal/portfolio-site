import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

// Pass an existing Sharp installation; no project dependencies are changed.
const sharp = createRequire(import.meta.url)(process.argv[2] || "sharp");
const root = fileURLToPath(new URL("..", import.meta.url));
const svg = body => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${body}</svg>`);
const type = `font-family="Arial, sans-serif"`;
const serif = `font-family="Georgia, serif"`;
const home = svg(`<defs><radialGradient id="slate"><stop stop-color="#536e80"/><stop offset="1" stop-color="#151a22" stop-opacity="0"/></radialGradient><radialGradient id="rust"><stop stop-color="#864e46"/><stop offset="1" stop-color="#151a22" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="630" fill="#151a22"/><ellipse cx="1060" cy="170" rx="600" ry="440" fill="url(#slate)"/><ellipse cx="1140" cy="590" rx="580" ry="350" fill="url(#rust)"/>
<text x="72" y="105" ${type} font-size="25" font-weight="700" letter-spacing="3" fill="#d7dbe0">SHAWN PORTER</text>
<text x="68" y="250" ${serif} font-size="76" fill="#f0f2f4">Content strategy &amp;</text><text x="68" y="342" ${serif} font-size="76" fill="#f0f2f4">creative production.</text>
<rect x="72" y="409" width="72" height="3" fill="#ed6a58"/>
<text x="72" y="469" ${type} font-size="27" fill="#d7dbe0">Content, programming, and activation systems.</text>
<text x="72" y="568" ${type} font-size="22" letter-spacing="1" fill="#d7dbe0">SHAWNSPORTER.COM</text>`);
await sharp(home).png().toFile(resolve(root, "public/social-home.png"));

const scene = await sharp(resolve(root, "public/assets/last-rehearsal-investigation-scene.webp"))
  .resize(1200, 572, { fit: "fill" })
  .extend({ top: 0, bottom: 58, left: 0, right: 0, background: "#151a22" }).toBuffer();
const narrative = svg(`<defs><linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151a22" stop-opacity="0"/><stop offset=".48" stop-color="#151a22" stop-opacity=".15"/><stop offset="1" stop-color="#151a22" stop-opacity=".98"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#shade)"/>
<text x="60" y="430" ${type} font-size="23" font-weight="700" letter-spacing="3" fill="#f0f2f4">SHAWN PORTER</text>
<text x="58" y="500" ${serif} font-size="54" fill="#f0f2f4">Narrative Writing &amp;</text><text x="58" y="560" ${serif} font-size="54" fill="#f0f2f4">Interactive Storytelling</text>
<text x="60" y="603" ${type} font-size="18" letter-spacing="1" fill="#d7dbe0">SHAWNSPORTER.COM/NARRATIVE</text>`);
await sharp(scene).composite([{ input: narrative }]).png().toFile(resolve(root, "public/social-narrative.png"));
