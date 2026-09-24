import Image from "next/image";
import Link from "next/link";
import styles from "./homepage.module.css";
import { ContactBlock, SiteFooter, SiteHeader } from "./site-components";
import { caseStudies } from "./site-data";
import { homepageContent } from "./content-data";

const proofPoints = [
  ["25%", "YouTube subscriber growth for Fight Legends"],
  ["200K+", "listens for Cyber Metal Radio"],
  ["35%", "follower growth at Edge of Company"],
] as const;

const heroSignals = [
  ["Shows + interviews", "Concept, production, packaging"],
  ["Editorial + social", "Stories shaped for the feed"],
  ["Community + growth", "Programs built to bring people back"],
] as const;

function ContentMedia({ item, priority = false }: { item: (typeof homepageContent)[number]; priority?: boolean }) {
  if (item.media.type === "video") return <video controls playsInline preload={priority ? "auto" : "metadata"} poster={"poster" in item.media ? item.media.poster : undefined} aria-label={item.media.alt}><source src={item.media.src} type="video/mp4" /></video>;
  return <Image src={item.media.src} alt={item.media.alt} width={item.media.width} height={item.media.height} sizes="(max-width: 720px) calc(100vw - 36px), (max-width: 1080px) 50vw, 42vw" unoptimized priority={priority} />;
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className={styles.heroBand} id="home">
          <div className={`hero wrap ${styles.homeHero}`}>
            <p className="eyebrow">Shawn Porter / Content strategy &amp; creative production</p>
            <h1>I create the content and programs that turn ideas into audiences.</h1>
            <figure className={styles.heroPortrait}>
              <Image
                src="/assets/shawn-hero-portrait.webp"
                alt="Portrait of Shawn Porter wearing glasses and a cap"
                width={1254}
                height={1254}
                sizes="(min-width: 921px) min(48vw, 820px), 108px"
                unoptimized
                priority
              />
            </figure>
            <div className="hero-bottom">
              <p className="lede">I help creators, teams, and mission-led organizations turn shows, interviews, and ideas into content people can understand, share, and return to.</p>
              <div className={styles.heroActions}>
                <Link className="text-link" href="/#selected-content">Content Creation Examples <span>↗</span></Link>
                <Link className={styles.secondaryLink} href="/case-studies">Case Studies</Link>
              </div>
            </div>
            <div className={styles.heroSignals} aria-label="What Shawn makes">
              {heroSignals.map(([label, detail]) => <div key={label}><strong>{label}</strong><span>{detail}</span></div>)}
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
                  <h3 className={styles.laneTitle}><Link href={`/content/${item.laneSlug}`}>{item.lane}</Link></h3>
                  <Link className={styles.mediaLink} href={item.href} aria-label={`View ${item.lane}: ${item.title}`}><div className={styles.mediaFrame}><ContentMedia item={item} priority={index === 0} /></div></Link>
                  <div className={styles.cardCopy}>
                    <p className={styles.cardMeta}>{item.project} · {item.format}</p>
                    <h3>{item.title}</h3>
                    <p className={styles.cardDescriptor}>{item.summary}</p>
                    <p className={styles.shortCredit}>{item.shortCredit}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.caseSection} aria-labelledby="case-studies">
          <div className={styles.sectionWrap}>
            <header className={styles.sectionHeader}>
              <div><p>The outcomes</p><h2 id="case-studies">Selected outcomes</h2></div>
              <p>Evidence that the work reached people, created momentum, and gave audiences a reason to return.</p>
            </header>
            <div className={styles.proofGrid}>{proofPoints.map(([value, label]) => <article key={value}><strong>{value}</strong><span>{label}</span></article>)}</div>
            <div className={styles.caseRail}>
              {caseStudies.slice(0, 4).map((item) => <Link href={`/case-studies/${item.slug}`} key={item.slug}><strong>{item.title}</strong><small>{item.role}</small><b aria-hidden="true">↗</b></Link>)}
            </div>
            <div className={styles.sectionCta}><Link href="/case-studies">View all case studies <span>↗</span></Link></div>
          </div>
        </section>

        <ContactBlock eyebrow="Have a show, story, or audience to build?" heading="Let’s shape the content and system behind it." />
      </main>
      <SiteFooter />
    </>
  );
}
