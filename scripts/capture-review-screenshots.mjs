import { existsSync } from "node:fs";
import { mkdir, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const baseUrl = new URL(process.env.PORTFOLIO_BASE_URL ?? "http://localhost:3010");
const outputDirectory = resolve(
  projectRoot,
  "review-artifacts",
  "screenshots",
  new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-"),
);

const pages = [
  ["home", "/"],
  ["case-studies", "/case-studies"],
  ["fight-legends", "/case-studies/fight-legends"],
  ["shows-video", "/content/podcast-show-overlay-design"],
];

const viewports = [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
];

function canRun(executable) {
  const result = spawnSync(executable, ["--version"], {
    encoding: "utf8",
    stdio: "ignore",
    timeout: 5000,
    windowsHide: true,
  });
  return !result.error && result.status === 0;
}

function browserCandidates() {
  if (process.env.PORTFOLIO_BROWSER_PATH) return [process.env.PORTFOLIO_BROWSER_PATH];

  if (process.platform === "win32") {
    const roots = [
      process.env["PROGRAMFILES(X86)"],
      process.env.ProgramFiles,
      process.env.LOCALAPPDATA,
    ].filter(Boolean);
    return [
      ...roots.flatMap((root) => [
        join(root, "Microsoft", "Edge", "Application", "msedge.exe"),
        join(root, "Google", "Chrome", "Application", "chrome.exe"),
        join(root, "BraveSoftware", "Brave-Browser", "Application", "brave.exe"),
      ]),
      "msedge.exe",
      "chrome.exe",
      "brave.exe",
    ];
  }

  if (process.platform === "darwin") {
    return [
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
      "chromium",
      "google-chrome",
    ];
  }

  return ["microsoft-edge", "google-chrome", "chromium", "chromium-browser", "brave-browser"];
}

const browser = browserCandidates().find((candidate) =>
  (candidate.includes("/") || candidate.includes("\\")) && existsSync(candidate)
    ? canRun(candidate)
    : canRun(candidate),
);

if (!browser) {
  throw new Error(
    "Could not find Chrome, Edge, or Chromium. Install one or set PORTFOLIO_BROWSER_PATH to its executable.",
  );
}

for (const [label, path] of pages) {
  const url = new URL(path, baseUrl);
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(`Local preview is unavailable at ${url}: ${error.message}`);
  }
  if (response.status !== 200 || !(response.headers.get("content-type") ?? "").includes("text/html")) {
    throw new Error(`Expected ${label} preview ${url} to return HTML 200; got ${response.status}.`);
  }
}

await mkdir(outputDirectory, { recursive: true });

for (const [pageLabel, path] of pages) {
  const url = new URL(path, baseUrl).href;
  for (const [viewportLabel, width, height] of viewports) {
    const outputPath = join(outputDirectory, `${pageLabel}-${viewportLabel}.png`);
    const profilePath = join(tmpdir(), `portfolio-review-${randomUUID()}`);
    await mkdir(profilePath, { recursive: true });

    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--run-all-compositor-stages-before-draw",
      "--force-device-scale-factor=1",
      `--window-size=${width},${height}`,
      "--virtual-time-budget=3000",
      "--timeout=15000",
      `--user-data-dir=${profilePath}`,
      `--screenshot=${outputPath}`,
    ];
    if (process.platform !== "win32") args.push("--no-sandbox");
    args.push(url);

    try {
      const result = spawnSync(browser, args, {
        stdio: "inherit",
        timeout: 30000,
        windowsHide: true,
      });
      if (result.error) throw result.error;
      if (result.status !== 0) throw new Error(`Browser exited with status ${result.status}.`);
      const details = await stat(outputPath).catch(() => null);
      if (!details?.isFile() || details.size === 0) throw new Error("Browser did not create a screenshot.");
      console.log(`${pageLabel} ${viewportLabel}: ${outputPath}`);
    } finally {
      await rm(profilePath, { recursive: true, force: true });
    }
  }
}

console.log(`Review these screenshots manually; they are not visual goldens: ${outputDirectory}`);
