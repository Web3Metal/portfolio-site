import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBlock, SiteFooter, SiteHeader } from "../../site-components";
import { contentLanes, featuredContent } from "../../content-data";
import styles from "../content.module.css";

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
  if (item.media.type === "video") return <video controls playsInline preload="metadata" poster={"poster" in item.media ? item.media.poster : undefined} aria-label={item.media.alt}><source src={item.media.src} type="video/mp4" /></video>;
  return <Image src={item.media.src} alt={item.media.alt} width={item.media.width} height={item.media.height} sizes="(max-width: 780px) calc(100vw - 36px), 52vw" unoptimized />;
}


const writingCapabilities = [
  ["Journalism", "Reported stories, profiles, and community features that make a system, issue, or lived experience legible without flattening the people inside it.", "Features · profiles · analysis · community reporting"],
  ["Social media writing", "Short-form editorial that carries a clear point of view from the first idea to the final post—without losing the voice behind it.", "Social copy · campaign messaging · editorial framing"],
] as const;

const writingClips = [
  ["Local healthcare podcast bridges systemic gaps in patient care for ANHPIAs", "International Examiner", "Reported feature"],
  ["Let’s be honest. No one wants to do the budget. At best, it’s dreadfully tedious", "Seattle Weekly", "Reported essay"],
  ["Local Muslim civil rights advocate takes national role in D.C.", "International Examiner", "Profile"],
  ["Danny Woo Garden celebrates four decades with new exhibit", "International Examiner", "Community reporting"],
  ["Late last month, campaign-finance-reform activists got some good news", "Seattle Weekly", "Civic reporting"],
  ["As the Walking While Black demonstration winds down Saturday afternoon", "Seattle Weekly", "On-the-ground reporting"],
] as const;

function WritingLane() {
  return <div className={styles.writingLane}>
    <div className={styles.writingLaneIntro}>
      <div><p className={styles.meta}>How I write</p><h3>Find the signal. Give it a shape people can follow.</h3></div>
      <p>My writing background started in journalism and expanded into campaign messaging, social copy, and creator-led editorial. The format changes; the job stays consistent: understand what matters, then make it useful to someone else.</p>
    </div>
    <div className={styles.writingCapabilities}>{writingCapabilities.map(([title, copy, note]) => <article key={title}><p className={styles.meta}>Capability</p><h3>{title}</h3><p>{copy}</p><span>{note}</span></article>)}</div>
    <section className={styles.writingDiscipline} aria-labelledby="journalism-heading"><header className={styles.writingDisciplineHead}><div><p className={styles.meta}>Journalism</p><h3 id="journalism-heading">Reported work in context.</h3></div><p>Stories, profiles, and community reporting that turn complex subjects into something a reader can understand and act on.</p></header>
    <article className={styles.writingFeature}>
      <div className={styles.writingFeatureMedia}><Image src="/assets/writing-healthcare-podcast.jpg" alt="International Examiner article about a local healthcare podcast" width={1280} height={720} unoptimized /></div>
      <div><p className={styles.meta}>Featured sample · International Examiner</p><h3>Local healthcare podcast bridges systemic gaps in patient care for ANHPIAs</h3><p>A reported feature connecting a local story to a larger question about access, trust, and the systems people have to navigate to get care.</p><span>Reported feature · source-led interview · service journalism</span></div>
    </article>
    <section className={styles.writingClips} aria-labelledby="writing-clips"><header><div><p className={styles.meta}>Journalism clips</p><h3 id="writing-clips">Selected reporting</h3></div><p>A small edit of journalism and social writing. This is a portfolio selection, not a complete archive.</p></header><div className={styles.writingClipList}>{writingClips.map(([title, outlet, type]) => <article key={title}><div><h4>{title}</h4><p>{outlet}</p></div><span>{type}</span></article>)}</div></section>
    </section>
  </div>;
}
function GraphicDesignGallery({ items }: { items: (typeof featuredContent)[number][] }) {
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
            <header className={styles.sectionHead}><p>{lane.slug === "graphic-design" ? "Visual proof" : lane.slug === "writing" ? "Writing proof" : "Selected examples"}</p><h2 id="lane-work">{lane.slug === "graphic-design" ? "YouTube thumbnails in practice." : lane.slug === "writing" ? "Journalism and social writing in practice." : "The work behind the format."}</h2></header>
            {lane.slug === "graphic-design" ? <GraphicDesignGallery items={items} /> : lane.slug === "writing" ? <WritingLane /> : (
              <div className={styles.workList}>
                {items.map((item) => (
                  <article className={`${styles.workItem} ${item.orientation === "portrait" ? styles.portrait : ""}`} key={item.slug}>
                    {"external" in item && item.external ? (
                      <a className={styles.media} href={item.href} target="_blank" rel="noreferrer" aria-label={`Watch ${item.title} on YouTube`}><LaneMedia item={item} /></a>
                    ) : (
                      <Link className={styles.media} href={item.href}><LaneMedia item={item} /></Link>
                    )}
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
