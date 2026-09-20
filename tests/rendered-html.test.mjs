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
  assert.match(html, /I create the content and programs that turn ideas into audiences/);
  for (const label of ["Home", "Content", "Case Studies", "Writing", "About", "Resume", "Contact"]) assert.match(html, new RegExp(`>${label}<`));
  const sections = ['id="selected-content">Content Creation', 'id="formats">From first idea to finished release', 'id="case-studies">The work moved something', 'id="contact"'];
  let cursor = -1;
  for (const section of sections) { const next = html.indexOf(section); assert.ok(next > cursor, `${section} should appear in locked order`); cursor = next; }
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("case studies render in the locked order", async () => {
  const response = await render("/case-studies");
  assert.equal(response.status, 200);
  const html = await response.text();
  const titles = ["Ava Labs", "Cyber Metal Radio", "Fight Legends", "Edge of Company", "Web3 Metal", "Cointelegraph"];
  let cursor = -1;
  for (const title of titles) { const next = html.indexOf(`>${title}<`); assert.ok(next > cursor, `${title} should appear in locked order`); cursor = next; }
});

test("every locked navigation destination renders", async () => {
  for (const path of ["/content", "/case-studies", "/writing", "/about", "/resume", "/contact"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  }
});

test("content portfolio renders featured work and contribution details", async () => {
  const response = await render("/content");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const title of ["Fight Legends Dev Update", "Edge of NFT Social Interview", "DADABOTS Interview", "Episode packaging for the feed", "Editorial systems for creator work"]) assert.ok(html.includes(title));
  assert.doesNotMatch(html, /A radio station built as a recurring community ritual/);
  assert.match(html, /My contribution/);
  assert.match(html, /Extended samples/);
});
