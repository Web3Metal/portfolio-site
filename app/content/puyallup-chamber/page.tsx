import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../../site-components";
import shared from "../../wave-warz.module.css";
import styles from "./page.module.css";
import { chamberGalleryItem, chamberVideos, chamberStills } from "./data";
import { CollectionVideo } from "./collection-video";
import { CollectionGrid } from "./collection-grid";

export const metadata: Metadata = {
  title: chamberGalleryItem.title,
  description: chamberGalleryItem.descriptor,
};

export default function PuyallupChamberCollection() {
  return <><SiteHeader /><main className={shared.collection}><div className={`${shared.wrap} ${styles.wrap}`}>
    <Link className={shared.back} href="/#gallery">← Gallery</Link>
    <header className={shared.intro}>
      <h1>{chamberGalleryItem.title}</h1>
      <p>{chamberGalleryItem.descriptor}</p>
    </header>
    <CollectionGrid>{chamberVideos.map(video => <section className={styles.item} key={video.slug} data-chamber-loop aria-labelledby={video.slug}><div className={styles.card}>
      <CollectionVideo {...video} />
      <h2 id={video.slug}>{video.title}</h2>
      <a className={styles.source} href={video.sourceUrl} target="_blank" rel="noopener noreferrer">Original Instagram post ↗</a>
    </div></section>)}</CollectionGrid>
    <section id="selected-still-posts" className={styles.stills} aria-labelledby="stills-heading">
      <h2 id="stills-heading">Selected still posts</h2>
      <CollectionGrid>{chamberStills.map(still => <article className={styles.item} key={still.slug} data-chamber-still={still.slug} aria-labelledby={still.slug}><div className={`${styles.card} ${styles.stillCard}`}>
        {/* Saved post imagery is presented in full, without an inferred source link. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={still.src} alt={still.alt} width={still.width} height={still.height} loading="lazy" decoding="async" />
        <div className={styles.stillCopy}><h3 id={still.slug}>{still.title}</h3><p>{still.annotation}</p></div>
      </div></article>)}</CollectionGrid>
    </section>
  </div></main><SiteFooter /></>;
}
