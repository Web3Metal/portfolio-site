import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../site-components";
import { PerformanceVideo } from "./performance-video";
import { waveWarzVideos } from "./data";
import styles from "../../wave-warz.module.css";

export const metadata: Metadata = {
  title: "Wave Warz · Featured battle performance visuals",
  description: "Five music-video edits from Shawn Porter’s Wave Warz livestream battle performances, featuring his own OBS presentation and performance-video editing.",
};

export default function WaveWarzCollection() {
  return <><SiteHeader /><main className={styles.collection}><div className={styles.wrap}>
    <Link className={styles.back} href="/content">← Gallery</Link>
    <header className={styles.intro}>
      <h1>Wave Warz · Featured battle performance visuals</h1>
      <p>A selection of music-video edits created from five Wave Warz livestream battle performances. I designed the OBS presentation for my camera feed—including scene layouts, chroma key, lighting, and overlays—then edited selected performance recordings into standalone videos.</p>
      <p className={styles.role}>OBS scene design, visual setup, chroma key, lighting, overlays, virtual-camera workflow, and performance-video editing.</p>
    </header>
    <div className={styles.performanceGrid}>{waveWarzVideos.map(video => <section key={video.slug} aria-labelledby={video.slug}>
      <PerformanceVideo {...video} />
      <h2 id={video.slug}>{video.title}</h2>
    </section>)}</div>
  </div></main><SiteFooter /></>;
}
