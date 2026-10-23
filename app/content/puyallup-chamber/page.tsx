import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../../site-components";
import shared from "../../wave-warz.module.css";
import styles from "./page.module.css";
import { chamberArchiveItem, chamberVideos } from "./data";
import { CollectionVideo } from "./collection-video";
import { CollectionGrid } from "./collection-grid";

export const metadata: Metadata = {
  title: chamberArchiveItem.title,
  description: chamberArchiveItem.descriptor,
};

export default function PuyallupChamberCollection() {
  return <><SiteHeader /><main className={shared.collection}><div className={`${shared.wrap} ${styles.wrap}`}>
    <Link className={shared.back} href="/#gallery-archive">← Gallery archive</Link>
    <header className={shared.intro}>
      <h1>{chamberArchiveItem.title}</h1>
      <p>{chamberArchiveItem.descriptor}</p>
    </header>
    <CollectionGrid>{chamberVideos.map(video => <section className={styles.item} key={video.slug} aria-labelledby={video.slug}><div className={styles.card}>
      <CollectionVideo {...video} />
      <h2 id={video.slug}>{video.title}</h2>
      <a className={styles.source} href={video.sourceUrl} target="_blank" rel="noopener noreferrer">Original Instagram post ↗</a>
    </div></section>)}</CollectionGrid>
  </div></main><SiteFooter /></>;
}
