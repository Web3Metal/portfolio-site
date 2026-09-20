import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactBlock, SiteFooter, SiteHeader } from "../site-components";
import { featuredContent } from "../content-data";
import styles from "./content.module.css";

export const metadata: Metadata = {
  title: "Content Portfolio",
  description: "Selected video, podcast, social, editorial, live programming, and creator work by Shawn Porter.",
};

function PortfolioMedia({ item, priority = false }: { item: (typeof featuredContent)[number]; priority?: boolean }) {
  if (item.media.type === "video") return <video controls playsInline preload={priority ? "auto" : "metadata"} poster={"poster" in item.media ? item.media.poster : undefined} aria-label={item.media.alt}><source src={item.media.src} type="video/mp4" /></video>;
  return <Image src={item.media.src} alt={item.media.alt} width={item.media.width} height={item.media.height} sizes="(max-width: 780px) calc(100vw - 36px), 52vw" unoptimized priority={priority} />;
}

export default function ContentPortfolio() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className={styles.intro}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Content portfolio / Selected work</p>
            <h1>Stories, shows, and creative systems built to earn attention.</h1>
            <p className={styles.lede}>I work across video, podcasts, social, editorial, and live programming—shaping the idea, making the thing, and building the release system around it.</p>
          </div>
        </section>

        <section className={styles.work} aria-labelledby="featured-content">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}><p>Featured content</p><h2 id="featured-content">A few things I’ve made.</h2></header>
            <div className={styles.workList}>
              {featuredContent.map((item, index) => (
                <article className={`${styles.workItem} ${item.orientation === "portrait" ? styles.portrait : ""}`} key={item.slug}>
                  <div className={styles.media}><PortfolioMedia item={item} priority={index === 0} /></div>
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
          </div>
        </section>

        <section className={styles.archive} aria-labelledby="extended-samples">
          <div className={styles.wrap}>
            <p className={styles.kicker}>Extended samples</p>
            <div className={styles.archiveLayout}>
              <h2 id="extended-samples">More clips, articles, and published work.</h2>
              <div>
                <p>The projects above show the through-line. My Authory archive contains a broader range of vertical and landscape video, interviews, editorial work, and campaign samples.</p>
                <a href="https://authory.com/Shawnsporter" target="_blank" rel="noreferrer">Browse the full Authory portfolio <span>↗</span></a>
                <a href="https://authory.com/Shawnsporter/co/c52057bf4592d470eb2586d69eaa14e03/a/a742e07e7d49844ddb5f2e4c0eea4f2a6" target="_blank" rel="noreferrer">View recurring video &amp; podcast work <span>↗</span></a>
              </div>
            </div>
          </div>
        </section>

        <ContactBlock />
      </main>
      <SiteFooter />
    </>
  );
}
