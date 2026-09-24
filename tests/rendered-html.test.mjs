import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("homepage renders the content-first positioning, structure, and navigation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /I help creators, teams, and mission-led organizations turn shows, interviews, and ideas into content/);
  for (const label of ["Home", "Case Studies", "Writing", "About", "Resume", "Contact"]) assert.match(html, new RegExp(`>${label}<`));
  assert.doesNotMatch(html, />Content</);
  const sections = ['id="selected-content">Content Creation', 'id="case-studies">Selected outcomes', 'id="contact"'];
  let cursor = -1;
  for (const section of sections) { const next = html.indexOf(section); assert.ok(next > cursor, `${section} should appear in locked order`); cursor = next; }
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("case studies render in the locked order", async () => {
  const response = await render("/case-studies");
  assert.equal(response.status, 200);
  const html = await response.text();
  const titles = ["Ava Labs", "Cyber Metal Radio", "Fight Legends", "Edge of Company"];
  let cursor = -1;
  for (const title of titles) { const next = html.indexOf(`>${title}<`); assert.ok(next > cursor, `${title} should appear in locked order`); cursor = next; }
});

test("every locked navigation destination renders", async () => {
  for (const path of ["/case-studies", "/writing", "/about", "/resume", "/contact"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  }
});

test("the retired content archive redirects to the homepage proof section", async () => {
  const response = await render("/content");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/#selected-content");
});

test("focused content pages render their own relevant work", async () => {
  const response = await render("/content/podcast-show-overlay-design");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes("Fight Legends Dev Update"));
  assert.ok(html.includes("DADABOTS Interview"));
  assert.doesNotMatch(html, /Editorial systems for creator work/);
  assert.match(html, /My contribution/);
});
