import Image from "next/image";
import Link from "next/link";
import styles from "./homepage.module.css";
import { ContactBlock, SiteFooter, SiteHeader } from "./site-components";
import { workGroups } from "./portfolio-data";
import { HomepageGallery } from "./homepage-gallery";
import portfolio from "./portfolio.module.css";
import { HeroShowPreview } from "./hero-show-preview";

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
              <h1 className={styles.heroHeadline}>Content strategy &amp; creative production.</h1>
              <p className={styles.heroLede}>I develop the content, programming, and activation systems that help ambitious projects earn attention, participation, and momentum.</p>
              <div className={styles.compactHeroActions}>
                <Link className="button" href="/#community-growth-activation">Explore Community Growth &amp; Activation <span aria-hidden="true">↗</span></Link>
                <Link className="button" href="/#content-creative-work">View Content &amp; Creative Work <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </section>

        <section className={portfolio.work} aria-labelledby="work">
          <div className={portfolio.wrap}>
            <span id="case-studies" className={portfolio.anchor} />
            <header className={portfolio.heading}><h2 id="work" className={portfolio.anchor}>Work</h2><p>Professional projects. What I helped build, activate, and improve.</p></header>
            {workGroups.map(group => <section key={group.id} id={group.id} className={portfolio.group} aria-labelledby={`${group.id}-heading`}>
              <h3 id={`${group.id}-heading`}>{group.title}</h3>
              <div className={portfolio.workGrid}>{group.items.map(item => <Link className={portfolio.workCard} key={item.slug} href={`/case-studies/${item.slug}`}>
                <div className={portfolio.workImage}><Image src={item.image} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 620px) calc(100vw - 36px), 46vw" unoptimized /></div>
                <h4>{item.title}</h4><p>{item.context}</p><span>Explore the case study →</span>
              </Link>)}</div>
            </section>)}
            <div className={portfolio.more}><Link href="/narrative">Explore Narrative Writing &amp; Interactive Storytelling →</Link></div>
          </div>
        </section>
        <section className={portfolio.gallery} aria-labelledby="gallery">
          <div className={portfolio.wrap}>
            <span id="selected-content" className={portfolio.anchor} />
            <header className={portfolio.heading}><h2 id="gallery">Gallery</h2><p>Selected artifacts and creative projects. See the work itself.</p></header>
            <HomepageGallery />
          </div>
        </section>

        <ContactBlock compact eyebrow="Have a show, story, or audience to build?" heading="Let’s shape the content and system behind it." />
      </main>
      <SiteFooter />
    </>
  );
}
