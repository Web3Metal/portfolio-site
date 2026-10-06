import Image from "next/image";
import Link from "next/link";
import styles from "./homepage.module.css";
import { ContactBlock, SiteFooter, SiteHeader } from "./site-components";
import { caseStudies } from "./site-data";
import { homepageContent } from "./content-data";
import { HeroShowPreview } from "./hero-show-preview";

const caseStudyFocus = {
  "ava-labs": "Building developer activation funnels that connect outreach, programs, and follow-up.",
  "cyber-metal-radio": "Creating recurring artist-submission, discovery, and recognition loops for a niche community.",
  "fight-legends": "Helping shape a game’s world, character lore, and player-facing storytelling.",
  "edge-of-company": "Operationalizing long-form interviews into reliable podcast, video, and social publishing.",
} satisfies Record<(typeof caseStudies)[number]["slug"], string>;



function ContentMedia({ item, priority = false }: { item: (typeof homepageContent)[number]; priority?: boolean }) {
  if (item.media.type === "video") return <video controls playsInline preload={priority ? "auto" : "metadata"} poster={"poster" in item.media ? item.media.poster : undefined} aria-label={item.media.alt}><source src={item.media.src} type="video/mp4" /></video>;
  return <Image src={item.media.src} alt={item.media.alt} width={item.media.width} height={item.media.height} sizes="(max-width: 720px) calc(100vw - 36px), (max-width: 1080px) 50vw, 42vw" style={item.slug === "ai-builder-community" ? { objectFit: "contain" } : undefined} unoptimized priority={priority} />;
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className={styles.heroBand} id="home">
          <HeroShowPreview />
          <div className={`wrap ${styles.compactHero}`}>
            <div className={styles.heroCopy}>
              <p className="eyebrow">SHAWN PORTER</p>
              <h1 className={styles.heroHeadline}>Content strategy, creative production, and community engagement.</h1>
              <p className={styles.heroLede}>I develop the content, programming, and activation systems that help ambitious projects earn attention, participation, and momentum.</p>
              <div className={styles.compactHeroActions}>
                <Link className="button" href="/#case-studies">View selected work <span aria-hidden="true">↗</span></Link>
                <Link className="text-link" href="/#selected-content">Explore content portfolio <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.reelSection} aria-labelledby="selected-content">
          <div className={styles.sectionWrap}>
            <header className={styles.sectionHeader}>
              <div><p>The work</p><h2 id="selected-content">Content Creation</h2></div>
              <p>Representative work across show production, short-form editing, visual packaging, and writing—each card points to a deeper body of proof.</p>
            </header>
            <div className={styles.reelGrid}>
              {homepageContent.map((item, index) => (
                <article className={`${styles.reelCard} ${index === 0 ? styles.reelLead : ""} ${item.orientation === "portrait" ? styles.reelPortrait : ""}`} key={item.slug}>
                  <h3 className={styles.laneTitle}><Link href={item.laneSlug === "ai-builder-community" ? item.href : `/content/${item.laneSlug}`}>{item.lane}</Link></h3>
                  <Link className={styles.mediaLink} href={item.href} aria-label={`View ${item.lane}: ${item.title}`}><div className={styles.mediaFrame}><ContentMedia item={item} priority={index === 0} /></div></Link>

                </article>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.sectionWrap}><Link className="text-link" href="/gaming-interactive">Gaming &amp; Interactive work <span>↗</span></Link></div>

        <section className={styles.caseSection} aria-labelledby="case-studies">
          <div className={styles.sectionWrap}>
            <header className={styles.sectionHeader}>
              <div><p>Case studies</p><h2 id="case-studies">Selected case studies</h2></div>
              <p>Choose a project by the kind of work you want to see in depth.</p>
            </header>
            <div className={styles.caseRail}>
              {caseStudies.slice(0, 4).map((item) => <Link href={`/case-studies/${item.slug}`} key={item.slug}><strong>{item.title}</strong><small>{item.role}</small><p className={styles.caseFocus}>{caseStudyFocus[item.slug]}</p><b aria-hidden="true">↗</b></Link>)}
            </div>
            <div className={styles.sectionCta}><Link href="/case-studies">View all case studies <span>↗</span></Link></div>
          </div>
        </section>

        <ContactBlock compact eyebrow="Have a show, story, or audience to build?" heading="Let’s shape the content and system behind it." />
      </main>
      <SiteFooter />
    </>
  );
}
