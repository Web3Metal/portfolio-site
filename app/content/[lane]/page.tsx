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
            <header className={styles.sectionHead}><p>Selected examples</p><h2 id="lane-work">The work behind the format.</h2></header>
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
            <Link className={styles.projectLink} href="/content">View all content work <span>↗</span></Link>
            <nav className={styles.laneNav} aria-label="Explore content lanes">
              <Link href="/">Home <span>↗</span></Link>
              {contentLanes.filter((otherLane) => otherLane.slug !== lane.slug).map((otherLane) => <Link key={otherLane.slug} href={`/content/${otherLane.slug}`}>{otherLane.title} <span>↗</span></Link>)}
            </nav>
          </div>
        </section>
        <ContactBlock />
      </main>
      <SiteFooter />
    </>
  );
}
