import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { navItems, caseStudies } from "../app/site-data.ts";
import { contentLanes, featuredContent, homepageContent } from "../app/content-data.ts";
import { fightLegendsSamples } from "../app/content/fight-legends/samples.ts";
import { documents as fightDocuments, campaign as fightCampaign, community as fightCommunity, videos as fightVideos, campaignVideo as fightCampaignVideo } from "../app/content/fight-legends/collection-data.ts";
import { galleryItems, workGroups } from "../app/portfolio-data.ts";
import { waveWarzVideos } from "../app/content/wave-warz/data.ts";
import { newsletterItem, web3MetalVideos } from "../app/content/web3-metal/data.ts";
import { guestReel, artBasel, interviewPresentation, packaging, socialRollout } from "../app/content/edge-visuals/data.ts";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const builtRoot = resolve(projectRoot, "dist/client");
const publicRoot = resolve(projectRoot, "public");

// These four case studies are the editorially selected portfolio scope. This
// check stays separate from the rendered index so a missing route is reported.
const intendedCaseStudySlugs = [
  "ava-labs",
  "cyber-metal-radio",
  "fight-legends",
  "edge-of-company",
];

const assetExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".mp4",
  ".pdf",
  ".png",
  ".svg",
  ".webm",
  ".webp",
]);

const mimeTypes = new Map([
  [".avif", "image/avif"],
  [".gif", "image/gif"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".mp4", "video/mp4"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webm", "video/webm"],
  [".webp", "image/webp"],
]);

async function serveBuiltAsset(request) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url).pathname);
  } catch {
    return new Response("Invalid asset path", { status: 400 });
  }

  const filePath = resolve(builtRoot, `.${pathname}`);
  const relativePath = relative(builtRoot, filePath);
  if (relativePath.startsWith("..") || isAbsolute(relativePath)) {
    return new Response("Invalid asset path", { status: 403 });
  }

  try {
    const body = await readFile(filePath);
    return new Response(request.method === "HEAD" ? null : body, {
      headers: {
        "content-type": mimeTypes.get(extname(filePath).toLowerCase()) ?? "application/octet-stream",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

const pageCache = new Map();

test("homepage and narrative have distinct social-sharing previews", async () => {
  for (const [route, filename, title] of [
    ["/", "social-home.png", "Content strategy &amp; creative production"],
    ["/narrative", "social-narrative.png", "Narrative Writing &amp; Interactive Storytelling"],
  ]) {
    const { html } = await page(route);
    assert.ok(html.includes(title));
    assert.match(html, new RegExp(`property="og:image" content="https://www\\.shawnsporter\\.com/${filename}"`));
    assert.match(html, new RegExp(`name="twitter:image" content="https://www\\.shawnsporter\\.com/${filename}"`));
    assert.ok(!html.includes('/og.png'));
    const asset = await serveBuiltAsset(new Request(`http://localhost/${filename}`));
    assert.equal(asset.status, 200);
    const bytes = Buffer.from(await asset.arrayBuffer());
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
  }
});

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${encodeURIComponent(path)}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: serveBuiltAsset } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function page(path) {
  if (!pageCache.has(path)) {
    pageCache.set(path, (async () => {
      const response = await render(path);
      return { response, html: await response.clone().text() };
    })());
  }
  return pageCache.get(path);
}

function localPathFromHref(href, basePath = "/") {
  if (!href) return null;
  let url;
  try {
    url = new URL(href.replaceAll("&amp;", "&"), `http://localhost${basePath}`);
  } catch {
    return null;
  }
  if (url.origin !== "http://localhost") return null;
  const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
  return { pathname, hash: decodeURIComponent(url.hash.slice(1)) };
}

function attributesFromTag(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((match) => [
      match[1].toLowerCase(),
      (match[2] ?? match[3] ?? "").replaceAll("&amp;", "&"),
    ]),
  );
}

function metaValue(html, key, keyAttribute = "name") {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = attributesFromTag(match[0]);
    if (attributes[keyAttribute] === key) return attributes.content ?? "";
  }
  return "";
}

function routeFromReference(reference) {
  return localPathFromHref(reference)?.pathname ?? null;
}

const routePaths = new Set([
  "/",
  "/case-studies",
  "/writing",
  "/ai-builder-community",
  "/narrative",
  "/content/wave-warz",
  "/content/web3-metal",
  "/content/edge-visuals",
  "/content/fight-legends",
  "/about",
  "/resume",
  "/contact",
  "/lab",
  ...navItems.map(([, href]) => routeFromReference(href)),
  ...caseStudies.map((item) => `/case-studies/${item.slug}`),
  ...intendedCaseStudySlugs.map((slug) => `/case-studies/${slug}`),
  ...featuredContent.map((item) => routeFromReference(item.href)),
  ...homepageContent.map((item) => routeFromReference(item.href)),
  ...contentLanes.map((lane) => `/content/${lane.slug}`),
  ...fightLegendsSamples.map((sample) => `/content/fight-legends/${sample.slug}`),
]);
routePaths.delete(null);

test("homepage is the canonical six-item Gallery with an Art Basel featured thumbnail", async () => {
  const { html } = await page("/");
  assert.equal([...html.matchAll(/data-home-gallery-item=/g)].length, 6);
  assert.match(html, /data-gallery-column="2"[\s\S]*data-home-gallery-item="last-rehearsal"[\s\S]*data-home-gallery-item="dadabots-prodigy"/);
  const fightCard = html.match(/data-home-gallery-item="fight-character-edit"([\s\S]*?)data-gallery-column="2"/)?.[1];
  assert.ok(fightCard);
  assert.match(fightCard, /<video[^>]*loop=""[^>]*muted=""[^>]*playsInline=""/i);
  assert.doesNotMatch(fightCard, /<video[^>]*controls/i);
  assert.ok(fightCard.includes('/assets/fight-legends/character-development-edit-poster.jpg'));
  assert.ok(fightCard.includes('href="/content/fight-legends"'));
  assert.ok(fightCard.includes('View collection'));
  assert.doesNotMatch(html, /edge-nft-toonstar\.png|See all gallery/);
  const edge = galleryItems.find(item => item.id === "edge-art-basel");
  assert.equal(edge.triptych.length, 3);
  assert.ok(html.includes(edge.image));
  for (const panel of edge.triptych.slice(1)) assert.ok(!html.includes(panel.src));
  const retired = await render("/content");
  assert.equal(retired.status, 307);
  assert.equal(retired.headers.get("location"), "http://localhost/#gallery");
});

test("Wave Warz is one curated collection with five on-demand recordings", async () => {
  assert.equal(galleryItems.filter(item => item.id === "wave-warz").length, 1);
  assert.equal(waveWarzVideos.length, 5);
  const { html, response } = await page("/content/wave-warz");
  assert.equal(response.status, 200);
  assert.match(html, /I designed the OBS presentation for my camera feed/);
  assert.match(html, /Gotta Catch ’Em All Bodies/);
  assert.doesNotMatch(html, /<video\b|<source\b/);
  for (const item of waveWarzVideos) {
    assert.ok(html.includes(item.title), `collection includes ${item.title}`);
    assert.ok(html.includes(`Play ${item.title}`), `recording loads only on request: ${item.title}`);
  }
});

test("Web3 Metal has one Gallery entry and manually curated on-demand artifacts", async () => {
  const card = galleryItems.filter(item => item.id === "dadabots-prodigy");
  assert.equal(card.length, 1);
  assert.equal(card[0].href, "/content/web3-metal");
  assert.equal(web3MetalVideos.length, 4);
  assert.deepEqual(web3MetalVideos.slice(0, 3).map(video => video.id), ["prodigy-vs-nin", "atari-vs-aphex", "suno-mashup"]);
  assert.equal(web3MetalVideos[2].role, "Concept, production, filming, editing & publishing");
  const { html, response } = await page("/content/web3-metal");
  assert.equal(response.status, 200);
  assert.doesNotMatch(html, /<video\b|<source\b/);
  for (const video of web3MetalVideos) assert.ok(html.includes(`Play ${video.title}`));
  assert.ok(html.includes(newsletterItem.title));
  assert.ok(html.includes(newsletterItem.href));
  assert.ok(html.includes(newsletterItem.descriptor));
  assert.doesNotMatch(html, /latest/i);
});

test("Edge Gallery collection preserves approved visual groups and narrow credits", async () => {
  const cards = galleryItems.filter(item => item.id === "edge-art-basel");
  assert.equal(cards.length, 1);
  assert.equal(cards[0].href, "/content/edge-visuals");
  const { html, response } = await page("/content/edge-visuals");
  assert.equal(response.status, 200);
  assert.doesNotMatch(html, /<video\b|<source\b|\/case-studies\/edge-of-company/);
  assert.ok(html.includes('Play All Guest Intro Reel'));
  assert.ok(html.includes('Show overlay design'));
  assert.ok(html.includes('Art Basel field-interview series'));
  assert.ok(html.includes('Interview presentation → social adaptation'));
  assert.doesNotMatch(html, /edge-nft-toonstar\.png|interview-overlay-guest\.jpg/);
  assert.equal(interviewPresentation.length, 2);
  assert.ok(html.indexOf('id="art-basel"') < html.indexOf('id="interview-presentation"'));
  assert.ok(html.includes('Social rollout'));
  for (const item of [...artBasel, ...interviewPresentation, ...packaging, ...socialRollout]) assert.ok(html.includes(item.src));
});

test("every intended app and portfolio destination renders HTML", async (t) => {
  for (const path of [...routePaths].sort()) {
    await t.test(path, async () => {
      const { response } = await page(path);
      assert.equal(response.status, 200, `${path} should return 200`);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, `${path} should return HTML`);
    });
  }
});

test("every rendered internal link resolves and every fragment has a target", async (t) => {
  const targets = new Map();
  for (const sourcePath of [...routePaths].sort()) {
    const { response, html } = await page(sourcePath);
    if (response.status < 200 || response.status >= 300) continue;
    for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
      const attributes = attributesFromTag(match[0]);
      const target = localPathFromHref(attributes.href, sourcePath);
      if (!target) continue;
      const key = `${target.pathname}${target.hash ? `#${target.hash}` : ""}`;
      if (!targets.has(key)) targets.set(key, target);
    }
  }

  for (const [label, target] of targets) {
    await t.test(label, async () => {
      let { response, html } = await page(target.pathname);
      if (target.pathname === "/content" && response.status === 307) {
        assert.equal(response.headers.get("location"), "http://localhost/#gallery");
        ({ response, html } = await page("/"));
        assert.ok(html.includes('id="gallery"'));
      }
      assert.equal(response.status, 200, `internal link ${label} should return 200`);
      if (target.hash) {
        const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
        assert.ok(ids.has(target.hash), `internal link ${label} should point to an element id`);
      }
    });
  }
});

test("rendered pages include useful title and description metadata", async (t) => {
  for (const path of [...routePaths].sort()) {
    const { response, html } = await page(path);
    if (response.status !== 200) continue;
    await t.test(path, () => {
      assert.match(html, /<title>[^<]+<\/title>/i, `${path} should have a title`);
      assert.ok(metaValue(html, "description").trim().length >= 20, `${path} should have a useful description`);
    });
  }

  const { html: homeHtml } = await page("/");
  assert.ok(metaValue(homeHtml, "og:title", "property"), "homepage should provide an Open Graph title");
  assert.ok(metaValue(homeHtml, "og:image", "property"), "homepage should provide an Open Graph image");
  assert.equal(metaValue(homeHtml, "twitter:card"), "summary_large_image");
});

test("local media references exist in both public source and built output", async (t) => {
  const references = new Set();
  const addReference = (value) => {
    const target = localPathFromHref(value);
    if (!target || target.pathname.startsWith("/_next/")) return;
    if (assetExtensions.has(extname(target.pathname).toLowerCase())) references.add(target.pathname);
  };

  for (const item of [...featuredContent, ...homepageContent]) {
    if (item.media.type === "video" || item.media.type === "image") addReference(item.media.src);
    if ("poster" in item.media) addReference(item.media.poster);
  }
  for (const item of caseStudies) addReference(item.image);
  for (const item of galleryItems) { addReference(item.image); addReference(item.href); if ("preview" in item) addReference(item.preview); }
  for (const item of waveWarzVideos) { addReference(`/assets/wave-warz/${item.slug}.mp4`); addReference(`/assets/wave-warz/${item.slug}-poster.jpg`); }
  for (const item of web3MetalVideos) { addReference(item.src); addReference(item.poster); }
  addReference(newsletterItem.cover);
  for (const item of [...artBasel, ...interviewPresentation, ...packaging, ...socialRollout]) addReference(item.src);
  addReference(guestReel.src); addReference(guestReel.poster);
  for (const item of [...fightDocuments, ...fightCampaign, ...fightCommunity, ...fightVideos, fightCampaignVideo]) addReference(item.path);
  for (const item of [...fightVideos, fightCampaignVideo]) addReference(item.video);
  for (const group of workGroups) for (const item of group.items) addReference(item.image);

  for (const sourcePath of [...routePaths].sort()) {
    const { response, html } = await page(sourcePath);
    if (response.status !== 200) continue;
    for (const match of html.matchAll(/\b(?:src|poster|href|content)\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)) {
      addReference(match[1] ?? match[2]);
    }
  }

  for (const pathname of [...references].sort()) {
    await t.test(pathname, async () => {
      const publicPath = resolve(publicRoot, `.${decodeURIComponent(pathname)}`);
      const builtPath = resolve(builtRoot, `.${decodeURIComponent(pathname)}`);
      for (const filePath of [publicPath, builtPath]) {
        const pathFromRoot = relative(filePath === publicPath ? publicRoot : builtRoot, filePath);
        assert.ok(!pathFromRoot.startsWith("..") && !isAbsolute(pathFromRoot), `${pathname} must stay inside its asset root`);
        const details = await stat(filePath).catch(() => null);
        assert.ok(details?.isFile() && details.size > 0, `${pathname} should exist and be non-empty at ${filePath}`);
      }
    });
  }
});

test("résumé page links to a real downloadable PDF served from the build", async () => {
  const { html } = await page("/resume");
  const downloadLink = [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((match) => attributesFromTag(match[0]))
    .find((attributes) => attributes.href === "/Shawn-Porter-Resume.pdf" && "download" in attributes);
  assert.ok(downloadLink, "résumé page should include a download link for the PDF");

  const response = await render("/Shawn-Porter-Resume.pdf");
  assert.equal(response.status, 200, "built worker should serve the résumé PDF");
  assert.match(response.headers.get("content-type") ?? "", /^application\/pdf\b/i);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.ok(bytes.length > 10_000, "résumé PDF should not be empty or truncated");
});

test("homepage renders the approved positioning and section order", async () => {
  const { response, html } = await page("/");
  assert.equal(response.status, 200);
  assert.match(html, /Content strategy &amp; creative production\./);
  assert.match(html, /I develop the content, programming, and activation systems that help ambitious projects earn attention, participation, and momentum\./);
  assert.doesNotMatch(html, /I turn complex projects into content, experiences/);
  assert.doesNotMatch(html, /From live production and editorial direction/);
  const hero = html.match(/<section\b[^>]*id="home"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(hero, "homepage should include its compact hero");
  assert.doesNotMatch(hero, /shawn-hero-portrait/);
  assert.match(hero, /Explore Community Growth &amp; Activation/);
  assert.match(hero, /View Content &amp; Creative Work/);
  assert.match(hero, /href="\/#community-growth-activation"/);
  assert.match(hero, /href="\/#content-creative-work"/);
  assert.doesNotMatch(hero, /Fight Legends · Development show production|hero-show-clean-poster/);
  assert.match(hero, /Pause background animation/);
  assert.doesNotMatch(hero, /<video\b|Pause show preview|Play show preview/);
  const sections = ['id="work"', 'id="gallery"', 'id="contact"'];
  let cursor = -1;
  for (const section of sections) {
    const next = html.indexOf(section);
    assert.ok(next > cursor, `${section} should appear in locked order`);
    cursor = next;
  }
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("homepage Work groups lead with accomplished work and keep outcomes in case studies", async () => {
  const { html } = await page("/");
  const section = html.slice(html.indexOf('aria-labelledby="work"'), html.indexOf('aria-labelledby="gallery"'));
  assert.ok(section.includes("Professional projects."));
  const cards = [...section.matchAll(/<a\b[^>]*href="\/case-studies\/([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  assert.equal(cards.length, 4);
  for (const [index, item] of workGroups.flatMap(group => [...group.items]).entries()) {
    assert.equal(cards[index][1], item.slug);
    assert.ok(cards[index][2].includes(item.title.replaceAll("&", "&amp;")));
    assert.ok(cards[index][2].includes(item.context.replaceAll("&", "&amp;")));
    assert.ok(cards[index][2].includes(item.image));
  }
  for (const group of workGroups) assert.ok(section.includes(`id="${group.id}"`));
  assert.doesNotMatch(section, /25%|200K\+|35%/);
  for (const [route, metric] of [
    ["/case-studies/fight-legends", "25%"],
    ["/case-studies/cyber-metal-radio", "200,000+"],
    ["/case-studies/edge-of-company", "35%"],
  ]) {
    assert.ok((await page(route)).html.includes(metric), `${route} should retain its contextual metric`);
  }
});

test("four Work case studies consolidate challenge and contribution without changing later section order", async () => {
  for (const [slug, laterHeadings] of [
    ["ava-labs", ["How It Worked", "Outcomes &amp; Evidence", "What This Work Demonstrates"]],
    ["cyber-metal-radio", ["How It Worked", "Outcomes", "What I Learned"]],
    ["fight-legends", ["How It Worked", "Selected Work", "Explore the visual work", "Outcomes &amp; Evidence", "What I Learned"]],
    ["edge-of-company", ["How It Worked", "Explore the visual work", "Outcomes", "What I Learned"]],
  ]) {
    const { html } = await page(`/case-studies/${slug}`);
    const headings = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map(match => match[1]);
    assert.deepEqual(headings, ["Challenge &amp; contribution", ...laterHeadings]);
    const opening = html.match(/<section\b[^>]*aria-labelledby="challenge-heading"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(opening?.includes("I "), `${slug} identifies Shawn’s contribution`);
    assert.ok(!opening.includes("—"), `${slug} avoids em dashes in the revised opening`);
    assert.doesNotMatch(html, /id="role-heading"|The Starting Community/);
  }
});

test("Fight Legends connects narrative authorship and show production with attributed evidence", async () => {
  const { html } = await page("/case-studies/fight-legends");
  const headings = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map((match) => match[1]);
  assert.deepEqual(headings, ["Challenge &amp; contribution", "How It Worked", "Selected Work", "Explore the visual work", "Outcomes &amp; Evidence", "What I Learned"]);
  for (const copy of [
    "Making a game in development understandable and worth following through recurring development shows, early worldbuilding, and community storytelling.",
    "Artists conceptualized the characters",
    "I developed and wrote the worldbuilding",
    "Team/channel outcomes",
    "Personal production estimates",
    "Approximately 30%",
    "Roughly 25 to 35",
    "Estimated 75 to 140",
    "not measured impact attributable to the narrative writing",
  ]) assert.ok(html.includes(copy), `Fight Legends should preserve ${copy}`);
  assert.doesNotMatch(html, /href="https:\/\/medium\.com/);
  for (const artifact of ["/content/fight-legends/introducing-nix", "/content/fight-legends/nix-vs-ross-levine", "/content/fight-legends/story-mode", "/content/fight-legends"]) {
    assert.ok(html.includes(artifact), `Fight Legends should link its evidence: ${artifact}`);
  }
});

test("Fight Legends visual collection is curated with independent writing child routes and deferred videos", async () => {
  const { html, response } = await page("/content/fight-legends");
  assert.equal(response.status, 200);
  assert.ok(html.includes("Fight Legends · Game content &amp; community"));
  assert.ok(html.includes("As Community Manager &amp; Marketing Lead, I hosted and produced recurring Fight Legends development updates, turning in-progress game work into clear audience-facing conversations and social content. I also wrote player-facing material, developed campaign concepts, prepared art briefs and creative review with the lead graphic designer, and managed publishing and community participation."));
  assert.match(html, /<h2[^>]*>Hosted development updates<\/h2><p[^>]*>Recurring conversations that made new character work, gameplay systems, and in-progress builds understandable as Fight Legends developed\.<\/p>/);
  assert.doesNotMatch(html, /edited and packaged supplied developer and artist footage into short social updates/);
  assert.ok(html.includes("Community Manager &amp; Marketing Lead"));
  assert.ok(html.includes("Artwork, game captures, and character concepts shown throughout were created by the Fight Legends team unless otherwise noted."));
  assert.ok(!html.includes("Collection currently being curated."));
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.doesNotMatch(main, /<video\b/);
  assert.deepEqual([...main.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map(match => match[1]), ["Hosted development updates", "Game world and player-facing systems", "Name That Character campaign", "Community activation"]);
  assert.equal((main.match(/<strong>My role:<\/strong>/g) ?? []).length, 4);
  for (const [headingId, roleCopy] of [
    ["video-heading", "hosted and produced recurring development updates with the developer; prepared supplied gameplay and character-progress footage for each recording, guided the on-camera conversation, then edited 30–60 minute episodes into short social clips and published them."],
    ["world-heading", "wrote the articles and player-facing material. Accompanying artwork and game imagery are credited to the Fight Legends team."],
    ["campaign-heading", "conceived the participation campaign, wrote the copy, developed art briefs and provided creative review with the design team, edited the character-development video, and managed publishing and community response."],
    ["community-heading", "planned and published community content, wrote copy, and collaborated with the lead graphic designer on art briefs and creative review for supporting visuals."],
  ]) {
    const section = main.match(new RegExp(`<section[^>]*aria-labelledby="${headingId}"[^>]*>([\\s\\S]*?)<\\/section>`))?.[1];
    assert.ok(section.includes(`<strong>My role:</strong> ${roleCopy}`));
    assert.ok(section.indexOf("My role:") < section.search(/<(?:div|ol)\b/));
  }
  assert.equal((main.match(/<img\b/g) ?? []).length, 22);
  assert.equal((main.match(/aria-label="Play /g) ?? []).length, 4);
  assert.deepEqual([fightDocuments.length, fightCampaign.length, fightCommunity.length, fightVideos.length], [6, 6, 6, 3]);
  const communitySection = main.match(/<section[^>]*aria-labelledby="community-heading"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.match(communitySection, /<h2[^>]*>Community activation<\/h2><p[^>]*>Development updates, participation hooks, and platform-native posts used to keep the community engaged between milestones\.<\/p>/);
  assert.ok(communitySection.includes("/assets/fight-legends/narrative-ross.webp"));
  assert.ok(!main.includes("mint-pass.webp"));
  assert.deepEqual(fightVideos.map(item => item.slug), ["nix-unity", "cannon", "nix-combos"]);
  const campaignSection = main.match(/<section[^>]*aria-labelledby="campaign-heading"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(campaignSection.includes(fightCampaignVideo.title));
  assert.ok(campaignSection.indexOf(fightCampaignVideo.title) > campaignSection.indexOf("Winner announcement"));
  assert.doesNotMatch(main, /Two Piece and a Soda|Dev Update #22, first part/);
  assert.deepEqual(fightCampaign.map(item => item.slug), ["campaign-ideas", "campaign-prize", "campaign-walkthrough", "campaign-poll", "campaign-reminder", "campaign-winner"]);
  assert.doesNotMatch(campaignSection, /campaign-teaser/);
  assert.ok(campaignSection.includes("A six-step social campaign, shown in publication order."));
  assert.equal((campaignSection.match(/>STEP<\/span>/g) ?? []).length, 6);
  assert.deepEqual([...campaignSection.matchAll(/<span[^>]*>([0-9]{2})<\/span>/g)].map(match => match[1]), ["01", "02", "03", "04", "05", "06"]);
  assert.ok(main.includes('/content/fight-legends/story-mode'));
  assert.ok(main.includes('/content/fight-legends/introducing-nix'));
  assert.deepEqual(fightDocuments.map(item => item.href), ["/content/fight-legends/story-mode", "/content/fight-legends/introducing-nix", "/content/fight-legends/multiverse-theory", "/content/fight-legends/get-to-know-ross-levine", "/content/fight-legends/pvp-mode", "/assets/fight-legends/fight-legends-litepaper-v2-5.pdf"]);
  const documentSection = main.match(/<section[^>]*aria-labelledby="world-heading"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.equal((documentSection.match(/Read full writing sample/g) ?? []).length, 5);
  assert.ok(documentSection.includes("View illustrated PDF ↗"));
  assert.equal((documentSection.match(/<article\b/g) ?? []).length, 6);
  assert.deepEqual(fightDocuments.map(item => item.title), ["Story Mode", "Introducing Nix", "Multiverse Theory", "Get to know Ross Levine", "PvP Mode", "Litepaper"]);
  const documentEntries = [...documentSection.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].map(match => match[1]);
  for (const [index, entry] of documentEntries.entries()) {
    const item = fightDocuments[index];
    assert.ok(entry.includes(item.path));
    assert.ok(entry.includes("Fight Legends artists/team"));
    assert.ok(entry.indexOf("<img") < entry.indexOf("<h3"));
    assert.ok(entry.indexOf("<h3") < entry.indexOf(item.topic));
    assert.ok(entry.indexOf(item.topic) < entry.indexOf(item.caption));
    assert.ok(entry.indexOf(item.caption) < entry.indexOf(index === 5 ? "View illustrated PDF" : "Read full writing sample"));
    assert.equal((entry.match(new RegExp(`href="${item.href}"`, "g")) ?? []).length, 3);
  }
  assert.doesNotMatch(documentSection, /first-page preview|nix-vs-ross-levine/);
  assert.ok(!main.includes('Create a Character - Mr Giddyup'));
  const card = galleryItems.find(item => item.id === "fight-character-edit");
  assert.equal(card.href, "/content/fight-legends");
  assert.equal(card.action, "View collection");
  assert.equal(card.video, "/assets/fight-legends/character-development-edit.mp4");
  const study = (await page("/case-studies/fight-legends")).html;
  assert.ok(study.includes("Browse the Fight Legends visual collection →"));
  assert.ok(study.includes("name-that-character-bridge.webp"));
  assert.doesNotMatch(study, /Progress Became Content|<video\b/);
});

test("Fight Legends articles retain illustrations and the collection opens the original illustrated Litepaper", async () => {
  for (const [slug, image] of [["get-to-know-ross-levine", "ross-levine-article-artwork.webp"], ["pvp-mode", "pvp-mode-article-artwork.webp"]]) {
    const { html } = await page(`/content/fight-legends/${slug}`);
    const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(article.includes(image));
    assert.ok(article.includes("Fight Legends artists/team"));
    assert.ok(html.includes("Written by Shawn Porter"));
    assert.ok(html.includes("My contribution: concept and writing"));
  }
  const response = await serveBuiltAsset(new Request("http://localhost/assets/fight-legends/fight-legends-litepaper-v2-5.pdf"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/pdf");
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
  assert.equal(createHash("sha256").update(bytes).digest("hex"), "d6e2133e6150bec1c810bd46215b8d3871b28e8c20d0238cdf57859fc3928379");
});

test("local Fight Legends writing samples preserve article text without platform clutter", async () => {
  const escapeHtml = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
  for (const sample of fightLegendsSamples) {
    const { response, html } = await page(`/content/fight-legends/${sample.slug}`);
    assert.equal(response.status, 200);
    const article = html.match(/<article\b[^>]*aria-label="Archived article"[^>]*>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(article);
    for (const block of sample.blocks) {
      const text = "list" in block ? block.list : "table" in block ? [...block.table.headers, ...block.table.rows.flat()] : [block.text ?? block.heading ?? block.subheading];
      for (const part of text) assert.ok(article.includes(escapeHtml(part)), `preserve ${sample.slug} source text: ${part}`);
    }
    if ("credit" in sample) assert.ok(html.includes(escapeHtml(sample.credit)));
    assert.ok(html.includes("Written by Shawn Porter"));
    assert.ok(html.includes("My contribution:"));
    assert.doesNotMatch(html, /Individual authorship not specified|does not identify an individual document author/);
    assert.ok(html.includes(escapeHtml(sample.archiveNote)));
    if ("image" in sample) assert.ok(article.includes(sample.image));
    assert.doesNotMatch(article, /Sign up|Sign in|Subscribe|Enter your email|stories in your inbox|followers|medium\.com/);
    assert.doesNotMatch(html, /href="https:\/\/medium\.com/);
    const renderedMain = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.equal((renderedMain.match(/← Back to Fight Legends visual collection/g) ?? []).length, 2);
    assert.ok(html.includes('href="/content/fight-legends"'));
    assert.ok(!html.includes('/case-studies/fight-legends#assets-heading'));
  }
  assert.equal((await page("/content/fight-legends/not-a-sample")).response.status, 404);
});

test("case-study index renders its current entries in order", async () => {
  const { response, html } = await page("/case-studies");
  assert.equal(response.status, 200);
  let cursor = -1;
  for (const item of caseStudies) {
    const next = html.indexOf(`>${item.title}<`);
    assert.ok(next > cursor, `${item.title} should appear in index order`);
    cursor = next;
  }
});

test("canonical homepage Gallery has explicit external destinations and navigation", async () => {
  const { response, html } = await page("/");
  assert.equal(response.status, 200);
  for (const item of galleryItems) assert.ok(html.includes(item.href.replaceAll("&", "&amp;")));
  assert.ok(html.includes("External site"));
  assert.doesNotMatch(html, /href="\/writing"|href="\/content\/writing"/);
  assert.deepEqual(navItems.map(([label]) => label), ["Home", "Work", "Gallery", "About", "Résumé", "Contact"]);
  assert.equal(navItems.find(([label]) => label === "Gallery")[1], "/#gallery");
});

test("reclassified case-study URLs redirect to their appropriate destinations", async (t) => {
  const redirects = [
    ["/case-studies/web3-metal", "http://localhost/case-studies/cyber-metal-radio"],
    ["/case-studies/cointelegraph", "http://localhost/resume"],
  ];
  for (const [path, destination] of redirects) {
    await t.test(path, async () => {
      const response = await render(path);
      assert.equal(response.status, 307);
      assert.equal(response.headers.get("location"), destination);
    });
  }
});

test("narrative leads with professional worldbuilding before original interactive projects", async () => {
  const { html } = await page("/narrative");
  const headings = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map((match) => match[1]);
  assert.deepEqual(headings, [
    "Fight Legends: Worldbuilding and Narrative Writing",
    "From professional game worldbuilding to original interactive stories",
    "The Last Rehearsal",
    "From a compact mystery to a deeper original world",
    "Case-Zero",
    "I prototype story through play.",
    "Let’s build worlds with something to say.",
  ]);
  assert.ok(html.includes("PROFESSIONAL GAME WORLDBUILDING"));
  assert.ok(html.includes("NARRATIVE IN PLAY"));
  assert.ok(html.includes("On original projects, I work across story, gray-box spaces, puzzle flow, interaction implementation, and music so narrative decisions can be tested through play rather than described only on the page."));
});

test("legacy gaming route redirects to narrative, linked only from homepage Work", async () => {
  const retired = await render("/gaming-interactive");
  assert.equal(retired.status, 308);
  assert.equal(retired.headers.get("location"), "http://localhost/narrative");
  assert.doesNotMatch(await retired.text(), /fast MVP build|Featured gaming and interactive work/);
  const { html, response } = await page("/narrative");
  assert.equal(response.status, 200);
  for (const title of ["Fight Legends", "The Last Rehearsal", "Case-Zero"]) assert.ok(html.includes(title));
  for (const asset of ["last-rehearsal-investigation-scene.webp", "last-rehearsal-caseboard.webp", "case-zero-scene-01.webp", "case-zero-scene-02.webp", "case-zero-scene-03.webp", "nix-article-artwork.png"]) assert.ok(html.includes(asset));
  assert.ok(!navItems.some(([, href]) => ["/gaming-interactive", "/narrative"].includes(href)));
  for (const route of routePaths) {
    const rendered = (await page(route)).html;
    assert.ok(!/href="[^"\s]*gaming-interactive[^"\s]*"/.test(rendered), `${route} links to the retired gaming collection`);
    if (route !== "/") assert.ok(!/href="\/narrative(?:[#?"])/.test(rendered), `${route} adds an unapproved narrative link`);
  }
  const home = (await page("/")).html;
  assert.equal([...home.matchAll(/href="\/narrative"/g)].length, 1);
  assert.match(home, /Explore the case study →[\s\S]*href="\/narrative"[\s\S]*id="gallery"/);
  assert.ok((await page("/")).html.includes('href="https://replicant-case-01.r3plic4nt.chatgpt.site/"'));
  assert.ok(!(await page("/ai-builder-community")).html.includes("upcoming album"));
});

test("legacy visual and video URLs preserve access through the unified Gallery", async () => {
  for (const route of ["/content/podcast-show-overlay-design", "/content/short-form", "/content/graphic-design"]) {
    const { response, html } = await page(route);
    assert.equal(response.status, 200);
    assert.ok(html.includes("The Last Rehearsal"));
    assert.doesNotMatch(html, /Explore content lanes/);
  }
});
