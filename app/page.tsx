import Link from "next/link";
import {
  ExperimentFeature,
  FeaturedCaseStudy,
  HomepageSectionHeader,
  ProcessRail,
} from "./homepage-components";
import styles from "./homepage.module.css";
import { ContactBlock, SiteFooter, SiteHeader } from "./site-components";
import { caseStudies } from "./site-data";

const featuredCaseStudyConfig = [
  {
    slug: "ava-labs",
    href: "/case-studies/ava-labs",
    mediaLabel: "Builder engagement evidence",
    image: { src: "/assets/builder-wins.png", alt: "Ava Labs Builder Engagement Wins presentation cover", position: "left center" },
    summary: "Built and improved developer engagement pathways that moved builders from first contact toward programs, events, and deeper technical support.",
    proofPoint: "9,000+ developers engaged",
  },
  {
    slug: "cyber-metal-radio",
    href: "/case-studies/cyber-metal-radio",
    mediaLabel: "Recurring creator loop",
    typography: ["Artists create", "Submit", "Get discovered", "Community engages", "Artists return"],
    summary: "Helped turn an internet radio station into a recurring creator loop built around discovery, recognition, and community ritual.",
    proofPoint: "1,765 artist submissions in 2025",
  },
  {
    slug: "fight-legends",
    href: "/case-studies/fight-legends",
    mediaLabel: "Visible development progress",
    image: { src: "/assets/fight-legends/hero-development.png", alt: "Fight Legends character model development evidence" },
    summary: "Created a weekly development show and surrounding content system that made an unfinished game easier to follow and worth returning to.",
    proofPoint: "25% increase in YouTube subscribers",
  },
  {
    slug: "edge-of-company",
    href: "/case-studies/edge-of-company",
    mediaLabel: "Interview production and episode packaging",
    image: { src: "/assets/future-of-storytelling.jpeg", alt: "Edge of NFT Future of Storytelling episode artwork" },
    summary: "Connected podcast production, social programming, live conversations, and event coverage into one audience-growth engine.",
    proofPoint: "35% follower growth",
  },
] as const;

const featuredCaseStudies = featuredCaseStudyConfig.map((config) => {
  const caseStudy = caseStudies.find((item) => item.slug === config.slug);
  if (!caseStudy) throw new Error(`Missing case study data for ${config.slug}`);
  return { ...config, caseStudy };
});

const processItems = [
  { title: "Find the gap", copy: "Listen closely, map the audience, and identify what is missing between the idea and participation." },
  { title: "Build the system", copy: "Shape the content, programming, workflows, and touchpoints that make the idea useful and repeatable." },
  { title: "Run the loop", copy: "Publish, host, engage, measure, and refine until the system produces real momentum." },
] as const;

const writingSubjects = ["Technology", "Culture & music", "Civics & politics", "Editorial systems"] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className={`hero wrap ${styles.homeHero}`} id="home">
          <p className="eyebrow">Shawn Porter / Growth, community & creative technology</p>
          <h1>I find the missing system behind an idea—then build <span className={styles.contentPhrase}>the content,</span> community, or product that makes it work.</h1>
          <div className="hero-bottom">
            <p className="lede">I turn ambitious ideas into working ecosystems: clear stories, repeatable programs, measurable growth, and media people want to return to.</p>
            <Link className="text-link" href="/case-studies">View case studies <span>↗</span></Link>
          </div>
        </section>

        <section className={styles.homeSection} aria-labelledby="selected-work">
          <HomepageSectionHeader number="01" title="Selected Case Studies" headingId="selected-work" />
          {featuredCaseStudies.map(({ caseStudy, ...config }, index) => (
            <FeaturedCaseStudy
              key={caseStudy.slug}
              number={caseStudy.number}
              title={caseStudy.title}
              role={caseStudy.role}
              reverse={index % 2 === 1}
              {...config}
            />
          ))}
          <div className={styles.labFooter}>
            <Link className={styles.caseLink} href="/case-studies">View all case studies <span>↗</span></Link>
          </div>
        </section>

        <section className={styles.processSection} aria-labelledby="how-i-work">
          <HomepageSectionHeader number="02" title="How I Work" headingId="how-i-work" />
          <ProcessRail items={processItems} />
        </section>

        <section className={styles.homeSection} aria-labelledby="creative-lab">
          <HomepageSectionHeader number="03" title="Creative Lab" headingId="creative-lab" />
          <p className={styles.labIntro}>A working space for ideas that cross media, music, community, and lightweight product design.</p>
          <div className={styles.experimentGrid}>
            <ExperimentFeature
              number="01"
              category="Creator experiment"
              status="Workflow"
              title="AI music workflows"
              copy="Prompt design, rapid song prototyping, collaborative challenges, and public release experiments that connect tools to creative practice."
              image={{ src: "/assets/suno-metal-editorial.png", alt: "Web3 Metal editorial artwork about metal made with Suno" }}
            />
            <ExperimentFeature
              number="02"
              category="Community product"
              status="Early concept"
              title="Competition tools"
              copy="Early concepts for submission forms, ranking flows, and lightweight creator tools designed around real community behavior."
              image={{ src: "/assets/discord-programming.png", alt: "Web3 Metal community programming artwork" }}
            />
          </div>
          <div className={styles.labFooter}>
            <Link className={styles.caseLink} href="/lab">Enter the Lab <span>↗</span></Link>
          </div>
        </section>

        <section className={styles.writingSection} aria-labelledby="writing">
          <div className={styles.writingPanel}>
            <div>
              <p className={styles.sectionNumber}>04</p>
              <h2 id="writing">Writing</h2>
            </div>
            <div className={styles.writingCopy}>
              <p>Reporting and essays across technology, culture, music, politics, and the communities forming around them.</p>
              <ul className={styles.writingSubjects}>{writingSubjects.map((subject) => <li key={subject}>{subject}</li>)}</ul>
              <Link className={styles.caseLink} href="/writing">Browse writing <span>↗</span></Link>
            </div>
          </div>
        </section>

        <ContactBlock />
      </main>
      <SiteFooter />
    </>
  );
}
