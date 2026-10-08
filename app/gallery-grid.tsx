import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-components";
import { galleryItems } from "./portfolio-data";
import styles from "./portfolio.module.css";
import VideoPlayer from "./content/video-player";
import { WaveWarzPreview } from "./wave-warz-preview";

export function GalleryGrid({ limit }: { limit?: number }) {
  return <div className={styles.galleryGrid}>{galleryItems.slice(0, limit).map(item => "preview" in item ? <WaveWarzPreview key={item.id} /> : "video" in item ? (
    <article className={styles.galleryCard} key={item.id}>
      <div className={styles.galleryImage}><VideoPlayer controls playsInline preload="none" poster={item.image} width={item.width} height={item.height} aria-label={item.title}><source src={item.video} type="video/mp4" /></VideoPlayer></div>
      <div className={styles.galleryCaption}><h3>{item.title}</h3><p>{item.descriptor}</p><a href={item.href}>{item.action} →</a></div>
    </article>
  ) : (
    <a className={`${styles.galleryCard} ${item.height > item.width ? styles.galleryTall : ["artist-site", "last-rehearsal"].includes(item.id) ? styles.galleryWide : ""}`} href={item.href} key={item.id} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
      <div className={"triptych" in item ? styles.galleryTriptych : styles.galleryImage}>{"triptych" in item ? item.triptych.map(panel => <Image key={panel.src} src={panel.src} alt={panel.alt} width={panel.width} height={panel.height} unoptimized sizes="(max-width: 620px) 30vw, 10vw" />) : <Image src={item.image} alt={item.alt} width={item.width} height={item.height} unoptimized sizes={`(max-width: 620px) calc(100vw - 36px), (max-width: 1000px) ${["artist-site", "last-rehearsal"].includes(item.id) ? "90vw" : "45vw"}, ${["artist-site", "last-rehearsal"].includes(item.id) ? "46vw" : "30vw"}`} />}</div>
      <div className={styles.galleryCaption}><h3>{item.title}</h3><p>{item.descriptor}</p><span>{item.action} {item.external ? "↗" : "→"}{item.external && <small> · External site</small>}</span></div>
    </a>
  ))}</div>;
}

// Preserve only the existing nested legacy routes; do not create another index.
export function LegacyGalleryPage() {
  return <><SiteHeader /><main className={styles.gallery}><div className={styles.wrap}>
    <header className={styles.heading}><h1>Gallery</h1><p>Selected artifacts and creative projects. See the work itself.</p></header>
    <GalleryGrid />
    <div className={styles.more}><Link href="/#work">Explore professional work →</Link><Link href="/gaming-interactive">Gaming &amp; Interactive collection →</Link></div>
  </div></main><SiteFooter /></>;
}
