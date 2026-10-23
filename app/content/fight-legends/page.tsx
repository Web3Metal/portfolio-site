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
  title: "Fight Legends · Game content & community",
  description: "As Community Manager & Marketing Lead, I hosted and produced recurring Fight Legends development updates, turning in-progress game work into clear audience-facing conversations and social content. I also wrote player-facing material, developed campaign concepts, prepared art briefs and creative review with the lead graphic designer, and managed publishing and community participation.",
};

export default function FightLegendsVisualCollection() {
  return <><SiteHeader /><main className={shared.collection}><div className={`${shared.wrap} ${styles.wrap}`}>
    <Link className={shared.back} href="/#gallery">← Gallery</Link>
    <header className={`${shared.intro} ${styles.intro}`}>
      <p className={styles.headerRole}>Community Manager &amp; Marketing Lead</p>
      <h1>Fight Legends · Game content &amp; community</h1>
      <p>As Community Manager &amp; Marketing Lead, I hosted and produced recurring Fight Legends development updates, turning in-progress game work into clear audience-facing conversations and social content. I also wrote player-facing material, developed campaign concepts, prepared art briefs and creative review with the lead graphic designer, and managed publishing and community participation.</p>
      <p className={styles.attribution}>Artwork, game captures, and character concepts shown throughout were created by the Fight Legends team unless otherwise noted.</p>
    </header>
    <section className={styles.group} aria-labelledby="video-heading">
      <h2 id="video-heading">Hosted development updates</h2>
      <p className={styles.sectionIntro}>Recurring conversations that made new character work, gameplay systems, and in-progress builds understandable as Fight Legends developed.</p>
      <p className={styles.sectionRole}><strong>My role:</strong> hosted and produced recurring development updates with the developer; prepared supplied gameplay and character-progress footage for each recording, guided the on-camera conversation, then edited 30–60 minute episodes into short social clips and published them.</p>
      <div className={styles.grid}>{videos.map(item => <figure key={item.slug}>
        <ArtifactVideo title={item.title} src={item.video} poster={item.path} width={item.width} height={item.height} />
        <figcaption className={styles.caption}>{item.title}</figcaption>
      </figure>)}</div>
    </section>
    <section className={styles.group} aria-labelledby="world-heading">
      <h2 id="world-heading">Game world and player-facing systems</h2>
      <p className={styles.sectionRole}><strong>My role:</strong> wrote the articles and player-facing material. Accompanying artwork and game imagery are credited to the Fight Legends team.</p>
      <div className={styles.documents}>{documents.map(item => <article className={styles.documentEntry} key={item.slug}>
        <a className={styles.documentThumbnail} href={item.href} aria-label={`View ${item.title}`}>
          {/* Existing project artwork retains its natural proportions. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.path} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
        </a>
        <div className={styles.documentBody}>
          <h3><a href={item.href}>{item.title}</a></h3>
          <p className={styles.documentTopic}>{item.topic}</p>
          <p className={styles.documentDescription}>{item.description}</p>
          <p className={styles.documentCredit}>{item.caption}</p>
          <a className={styles.documentAction} href={item.href}>{item.slug === "litepaper" ? "View illustrated PDF ↗" : "Read full writing sample ↗"}</a>
        </div>
      </article>)}</div>
    </section>
    <section className={styles.group} aria-labelledby="campaign-heading">
      <h2 id="campaign-heading">Name That Character campaign</h2>
      <p className={styles.campaignIntro}>A six-step social campaign, shown in publication order.</p>
      <p className={styles.sectionRole}><strong>My role:</strong> conceived the participation campaign, wrote the copy, developed art briefs and provided creative review with the design team, edited the character-development video, and managed publishing and community response.</p>
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
      <p className={styles.sectionIntro}>Development updates, participation hooks, and platform-native posts used to keep the community engaged between milestones.</p>
      <p className={styles.sectionRole}><strong>My role:</strong> planned and published community content, wrote copy, and collaborated with the lead graphic designer on art briefs and creative review for supporting visuals.</p>
      <div className={styles.communityGrid}>{community.map(item => <figure key={item.slug}>
        <Preview item={item} /><figcaption className={styles.caption}>{item.title}</figcaption>
      </figure>)}</div>
    </section>
  </div></main><SiteFooter /></>;
}
