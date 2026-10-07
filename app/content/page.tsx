import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "../gallery-grid";
import styles from "../portfolio.module.css";
import { SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "Gallery", description: "Selected visual packages, creative projects, interactive experiences, and social content by Shawn Porter." };

export default function GalleryPage() {
  return <><SiteHeader /><main className={styles.gallery}><div className={styles.wrap}>
    <header className={styles.heading}><h1>Gallery</h1><p>Selected artifacts and creative projects. See the work itself.</p></header>
    <GalleryGrid />
    <div className={styles.more}><Link href="/#work">Explore professional work →</Link><Link href="/gaming-interactive">Gaming &amp; Interactive collection →</Link></div>
  </div></main><SiteFooter /></>;
}
