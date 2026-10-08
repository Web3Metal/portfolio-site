import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../site-components";
import { ArtifactVideo } from "./artifact-video";
import { newsletterItem, web3MetalVideos } from "./data";
import shared from "../../wave-warz.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Web3 Metal · Music and community publishing",
  description: "Selected video, editorial, and community-publishing artifacts from Web3 Metal.",
};

export default function Web3MetalCollection() {
  return <><SiteHeader /><main className={shared.collection}><div className={shared.wrap}>
    <Link className={shared.back} href="/content">← Gallery</Link>
    <header className={shared.intro}>
      <h1>Web3 Metal · Music and community publishing</h1>
      <p>Selected video, editorial, and community-publishing artifacts from Web3 Metal.</p>
    </header>
    <div className={styles.grid}><div className={styles.shorts}>{web3MetalVideos.slice(0, 3).map(video => <section key={video.id} aria-labelledby={video.id}>
      <div className={styles.portrait}><ArtifactVideo {...video} /></div>
      <h2 id={video.id}>{video.title}</h2><p className={styles.role}>{video.role}</p>
    </section>)}</div>
      {web3MetalVideos.slice(3).map(video => <section key={video.id} aria-labelledby={video.id}>
        <ArtifactVideo {...video} />
        <h2 id={video.id}>{video.title}</h2><p className={styles.role}>{video.role}</p>
      </section>)}
      <section aria-labelledby="newsletter-title">
        <a className={styles.newsletterCover} href={newsletterItem.href} target="_blank" rel="noopener noreferrer">
          <Image src={newsletterItem.cover} alt={`${newsletterItem.descriptor} cover: ${newsletterItem.title}`} width={newsletterItem.width} height={newsletterItem.height} sizes="(max-width: 620px) calc(100vw - 36px), 46vw" unoptimized />
        </a>
        <h2 id="newsletter-title">{newsletterItem.title}</h2><p className={styles.role}>{newsletterItem.descriptor}</p>
        <a className={styles.action} href={newsletterItem.href} target="_blank" rel="noopener noreferrer">{newsletterItem.action}</a>
      </section>
    </div>
  </div></main><SiteFooter /></>;
}
