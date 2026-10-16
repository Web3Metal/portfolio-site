import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../../site-components";
import shared from "../../wave-warz.module.css";
import styles from "./page.module.css";
import { documents, campaign, community, videos, campaignVideo } from "./collection-data";
import { ArtifactVideo } from "./artifact-video";

function Preview({ item }: { item: { title: string; path: string; width: number; height: number; href?: string } }) {
  return <a className={styles.imageLink} href={item.href ?? item.path} aria-label={`View ${item.title}`}>
    {/* Faithful artifact previews retain their original proportions. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={item.path} alt={item.title} width={item.width} height={item.height} loading="lazy" />
  </a>;
}

export const metadata: Metadata = {
  title: "Fight Legends · Visual production",
  description: "Selected character-development, community, and game-presentation work from Fight Legends.",
};

export default function FightLegendsVisualCollection() {
  return <><SiteHeader /><main className={shared.collection}><div className={`${shared.wrap} ${styles.wrap}`}>
    <Link className={shared.back} href="/#gallery">← Gallery</Link>
    <header className={shared.intro}>
      <h1>Fight Legends · Visual production</h1>
      <p>Selected character-development, community, and game-presentation work from Fight Legends.</p>
    </header>
    <section className={styles.group} aria-labelledby="video-heading">
      <h2 id="video-heading">Character and development video</h2>
      <div className={styles.grid}>{videos.map(item => <figure key={item.slug}>
        <ArtifactVideo title={item.title} src={item.video} poster={item.path} width={item.width} height={item.height} />
        <figcaption className={styles.caption}>{item.title}</figcaption>
      </figure>)}</div>
    </section>
    <section className={styles.group} aria-labelledby="campaign-heading">
      <h2 id="campaign-heading">Name That Character campaign</h2>
      <p className={styles.campaignIntro}>A six-step social campaign, shown in publication order.</p>
      <ol className={styles.sequence} aria-label="Campaign publication order">{campaign.map((item, index) => <li key={item.slug}>
        <div className={styles.stepMarker}><span className={styles.stepWord}>STEP</span> <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span></div>
        <p className={styles.caption}>{item.title}</p>
        <Preview item={item} />
      </li>)}</ol>
      <div className={styles.campaignPromo}><figure>
        <ArtifactVideo title={campaignVideo.title} src={campaignVideo.video} poster={campaignVideo.path} width={campaignVideo.width} height={campaignVideo.height} />
        <figcaption className={styles.caption}>{campaignVideo.title}</figcaption>
      </figure></div>
    </section>
    <section className={styles.group} aria-labelledby="community-heading">
      <h2 id="community-heading">Community activation</h2>
      <div className={styles.communityGrid}>{community.map(item => <figure key={item.slug}>
        <Preview item={item} /><figcaption className={styles.caption}>{item.title}</figcaption>
      </figure>)}</div>
    </section>
    <section className={styles.group} aria-labelledby="world-heading">
      <h2 id="world-heading">Game world and player-facing systems</h2>
      <div className={styles.documents}>{documents.map(item => <article className={styles.documentEntry} key={item.slug}>
        <h3><a href={item.href}>{item.title}</a></h3>
        <p className={styles.documentTopic}>{item.topic}</p>
        <p className={styles.documentDescription}>{item.description}</p>
        <figure>
          <a className={styles.imageLink} href={item.href} aria-label={`View ${item.title}`}>
            {/* Existing project artwork retains its natural proportions. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.path} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
          </a>
          <figcaption className={styles.documentCredit}>{item.caption}</figcaption>
        </figure>
        <a className={styles.documentAction} href={item.href}>{item.slug === "litepaper" ? "View illustrated PDF ↗" : "Read full writing sample ↗"}</a>
      </article>)}</div>
    </section>
  </div></main><SiteFooter /></>;
}
