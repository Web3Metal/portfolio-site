import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBlock, SiteFooter, SiteHeader } from "../../site-components";
import { contentLanes, featuredContent } from "../../content-data";
import styles from "../content.module.css";
import VideoPlayer from "../video-player";

type LanePageProps = { params: Promise<{ lane: string }> };

export function generateStaticParams() {
  return contentLanes.map((lane) => ({ lane: lane.slug }));
}

export async function generateMetadata({ params }: LanePageProps): Promise<Metadata> {
  const { lane: slug } = await params;
  const lane = contentLanes.find((item) => item.slug === slug);
  return lane ? { title: lane.title, description: lane.intro } : { title: "Content lane" };
}

function LaneMedia({ item }: { item: (typeof featuredContent)[number] }) {
  if (item.media.type === "video") return <VideoPlayer controls playsInline preload="metadata" poster={"poster" in item.media ? item.media.poster : undefined} aria-label={item.media.alt}><source src={item.media.src} type="video/mp4" /></VideoPlayer>;
  return <Image src={item.media.src} alt={item.media.alt} width={item.media.width} height={item.media.height} sizes="(max-width: 780px) calc(100vw - 36px), 52vw" unoptimized />;
}

const writingClips = [
  ["Local healthcare podcast bridges systemic gaps in patient care for ANHPIAs", "International Examiner", "Reported feature"],
  ["Let’s be honest. No one wants to do the budget. At best, it’s dreadfully tedious", "Seattle Weekly", "Reported essay"],
  ["Local Muslim civil rights advocate takes national role in D.C.", "International Examiner", "Profile"],
  ["Danny Woo Garden celebrates four decades with new exhibit", "International Examiner", "Community reporting"],
] as const;

function WritingLane() {
  return <div className={styles.writingLane}>
    <div className={styles.writingCapabilityGrid}>
      <section className={styles.writingCapabilityColumn} aria-labelledby="journalism-heading">
        <header className={styles.writingCapabilityHeader}><p className={styles.meta}>Capability</p><h3 id="journalism-heading">Journalism</h3><p>Reported stories, profiles, and community features that make a system, issue, or lived experience legible.</p></header>
        <div className={styles.writingClipList}>{writingClips.map(([title, outlet, type]) => <article key={title}><div><h4>{title}</h4><p>{outlet}</p></div><span>{type}</span></article>)}</div>
      </section>
      <section className={styles.writingCapabilityColumn} aria-labelledby="social-writing-heading">
        <header className={styles.writingCapabilityHeader}><p className={styles.meta}>Capability</p><h3 id="social-writing-heading">Social media writing</h3><p>Short-form editorial that carries a clear point of view from the first idea to the final post.</p></header>
        <div className={styles.writingComingSoon}><p className={styles.meta}>Examples coming soon</p><h4>Social copy, campaign messaging, and editorial framing.</h4><p>I’m collecting a focused set of social writing examples to show how the same clarity works at feed speed.</p></div>
      </section>
    </div>
  </div>;
}function ShowsVideoLane({ items }: { items: (typeof featuredContent)[number][] }) {
  const primary = items.filter((item) => item.orientation !== "portrait");
  const feedCuts = items.filter((item) => item.orientation === "portrait");
  const renderItems = (list: (typeof featuredContent)[number][]) => <div className={styles.workList}>{list.map((item) => (
    <article className={`${styles.workItem} ${item.orientation === "portrait" ? styles.portrait : ""}`} key={item.slug}>
      {("external" in item && item.external) || item.media.type === "video" ? <div className={styles.media}><LaneMedia item={item} /></div> : <Link className={styles.media} href={item.href}><LaneMedia item={item} /></Link>}
      <div className={styles.copy}><p className={styles.meta}>{item.format}</p><h3>{item.title}</h3><p className={styles.summary}>{item.summary}</p><dl><div><dt>My contribution</dt><dd>{item.contribution}</dd></div><div><dt>Impact</dt><dd>{item.impact}</dd></div></dl><div className={styles.tags}>{item.categories.map((category) => <span key={category}>{category}</span>)}</div><Link className={styles.projectLink} href={item.href}>View the project <span>↗</span></Link></div>
    </article>
  ))}</div>;
  return <>
    <section className={styles.primaryShows} aria-labelledby="primary-shows"><header className={styles.subsectionHead}><p className={styles.meta}>Primary examples</p><h3 id="primary-shows">Show examples.</h3><p>Examples of recurring shows and interview formats I produced, packaged, and helped bring to life.</p></header>{renderItems(primary)}</section>
    {feedCuts.length > 0 ? <section className={styles.feedCuts} aria-labelledby="feed-cuts"><header><p className={styles.meta}>Distribution layer</p><h3 id="feed-cuts">From the show to the feed.</h3><p>The long-form production becomes vertical, platform-native cuts that give each conversation a second life.</p></header>{renderItems(feedCuts)}</section> : null}
  </>;
}function GraphicDesignGallery({ items }: { items: (typeof featuredContent)[number][] }) {
  return (
    <>
      <div className={styles.galleryIntro}>
        <p>I design YouTube thumbnails and visual systems that help long-form video communicate quickly, feel recognizable, and earn the next click.</p>
      </div>
      <div className={styles.thumbnailGrid}>
        {items.map((item) => (
          <figure className={styles.thumbnailCard} key={item.slug}>
            <div className={styles.thumbnailMedia}><LaneMedia item={item} /></div>
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.shortCredit}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.systemNote}>
        <div>
          <p className={styles.meta}>Shared visual system</p>
          <h3>One recognizable language across different guests, places, and episodes.</h3>
        </div>
        <div>
          <p>Each thumbnail balances show identity, guest recognition, location, and a clear editorial hook so the work can flex without losing its source.</p>
          <a className={styles.projectLink} href="/case-studies/edge-of-company">Read the Edge of NFT case study <span>↗</span></a>
        </div>
      </div>
    </>
  );
}

export default async function ContentLanePage({ params }: LanePageProps) {
  const { lane: slug } = await params;
  const lane = contentLanes.find((item) => item.slug === slug);
  if (!lane) notFound();
  const items = lane.items.map((itemSlug) => featuredContent.find((item) => item.slug === itemSlug)).filter((item): item is (typeof featuredContent)[number] => Boolean(item));

  return (
    <>
      <SiteHeader />
      <main>
        <section className={styles.intro}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Content lane / Selected examples</p>
            <h1>{lane.title}</h1>
            <p className={styles.lede}>{lane.intro}</p>
          </div>
        </section>
        <section className={styles.work} aria-labelledby="lane-work">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}><p>{lane.slug === "graphic-design" ? "Visual proof" : lane.slug === "writing" ? "Writing proof" : lane.slug === "podcast-show-overlay-design" ? "Production proof" : "Selected examples"}</p><h2 id="lane-work">{lane.slug === "graphic-design" ? "YouTube thumbnails in practice." : lane.slug === "writing" ? "Journalism and social writing in practice." : lane.slug === "podcast-show-overlay-design" ? "Shows and video in practice." : "The work behind the format."}</h2></header>
            {lane.slug === "graphic-design" ? <GraphicDesignGallery items={items} /> : lane.slug === "writing" ? <WritingLane /> : lane.slug === "podcast-show-overlay-design" ? <ShowsVideoLane items={items} /> : (
              <div className={styles.workList}>
                {items.map((item) => (
                  <article className={`${styles.workItem} ${item.orientation === "portrait" ? styles.portrait : ""}`} key={item.slug}>
                    {("external" in item && item.external) || item.media.type === "video" ? <div className={styles.media}><LaneMedia item={item} /></div> : <Link className={styles.media} href={item.href}><LaneMedia item={item} /></Link>}
                    <div className={styles.copy}>
                      <p className={styles.meta}>{item.format}</p>
                      <h3>{item.title}</h3>
                      <p className={styles.summary}>{item.summary}</p>
                      <dl><div><dt>My contribution</dt><dd>{item.contribution}</dd></div><div><dt>Impact</dt><dd>{item.impact}</dd></div></dl>
                      <div className={styles.tags}>{item.categories.map((category) => <span key={category}>{category}</span>)}</div>
                      <Link className={styles.projectLink} href={item.href}>View the project <span>↗</span></Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
            <nav className={styles.laneNav} aria-label="Explore content lanes">
              <Link href="/">Home <span>↗</span></Link>
              {contentLanes.filter((otherLane) => otherLane.slug !== lane.slug).map((otherLane) => <Link key={otherLane.slug} href={`/content/${otherLane.slug}`}>{otherLane.title} <span>↗</span></Link>)}
            </nav>
          </div>
        </section>
        <ContactBlock compact />
      </main>
      <SiteFooter />
    </>
  );
}
