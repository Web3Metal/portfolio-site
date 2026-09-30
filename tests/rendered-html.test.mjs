import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { navItems, caseStudies } from "../app/site-data.ts";
import { contentLanes, featuredContent, homepageContent } from "../app/content-data.ts";

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
]);
routePaths.delete(null);

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
      const { response, html } = await page(target.pathname);
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
  assert.match(html, /I produce shows, interviews, and content systems people can follow\./);
  const sections = ['id="selected-content">Content Creation', 'id="case-studies">Selected case studies', 'id="contact"'];
  let cursor = -1;
  for (const section of sections) {
    const next = html.indexOf(section);
    assert.ok(next > cursor, `${section} should appear in locked order`);
    cursor = next;
  }
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
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

test("the retired content archive redirects to the homepage proof section", async () => {
  const response = await render("/content");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/#selected-content");
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

test("Shows & Video lane renders its relevant work", async () => {
  const { response, html } = await page("/content/podcast-show-overlay-design");
  assert.equal(response.status, 200);
  assert.ok(html.includes("Fight Legends Dev Update"));
  assert.ok(html.includes("DADABOTS Interview"));
  assert.match(html, /My contribution/);
});
