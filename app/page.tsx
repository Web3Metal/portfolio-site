import Link from "next/link";
import { CaseStudyList, ContactBlock, SiteFooter, SiteHeader } from "./site-components";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero wrap" id="home">
          <p className="eyebrow">Shawn Porter / Growth, community & creative technology</p>
          <h1>I find the missing system behind an idea—then build the content, community, or product that makes it work.</h1>
          <div className="hero-bottom">
            <p className="lede">I turn ambitious ideas into working ecosystems: clear stories, repeatable programs, measurable growth, and media people want to return to.</p>
            <Link className="text-link" href="/case-studies">View case studies <span>↗</span></Link>
          </div>
        </section>

        <section className="section wrap" aria-labelledby="selected-work">
          <div className="section-heading">
            <p className="section-number">01</p>
            <h2 id="selected-work">Selected Case Studies</h2>
          </div>
          <CaseStudyList compact />
        </section>

        <section className="section process-section" aria-labelledby="how-i-work">
          <div className="wrap">
            <div className="section-heading">
              <p className="section-number">02</p>
              <h2 id="how-i-work">How I Work</h2>
            </div>
            <div className="process-grid">
              <article><span>01</span><h3>Find the gap</h3><p>Listen closely, map the audience, and identify what is missing between the idea and participation.</p></article>
              <article><span>02</span><h3>Build the system</h3><p>Shape the content, programming, workflows, and touchpoints that make the idea useful and repeatable.</p></article>
              <article><span>03</span><h3>Run the loop</h3><p>Publish, host, engage, measure, and refine until the system produces real momentum.</p></article>
            </div>
          </div>
        </section>

        <section className="section wrap" aria-labelledby="creative-lab">
          <div className="section-heading">
            <p className="section-number">03</p>
            <h2 id="creative-lab">Creative Lab</h2>
          </div>
          <div className="lab-feature">
            <div>
              <p className="tag">Experiments / broadcasts / tools</p>
              <h3>A working space for ideas that cross media, music, community, and lightweight product design.</h3>
            </div>
            <div>
              <p>From AI-music prompts and community competitions to live radio programming and broadcast systems, the Lab shows the making—not just the outcome.</p>
              <Link className="text-link" href="/lab">Enter the Lab <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="section writing-band" aria-labelledby="writing">
          <div className="wrap writing-grid">
            <div>
              <p className="section-number">04</p>
              <h2 id="writing">Writing</h2>
            </div>
            <div>
              <p className="display-copy">Reporting and essays across technology, culture, music, politics, and the communities forming around them.</p>
              <Link className="text-link" href="/writing">Browse writing <span>↗</span></Link>
            </div>
          </div>
        </section>

        <ContactBlock />
      </main>
      <SiteFooter />
    </>
  );
}
