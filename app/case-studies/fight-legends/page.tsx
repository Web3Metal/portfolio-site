import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  LessonsList,
  ProseLead,
} from "../case-study-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fight Legends",
};

const title = "Fight Legends";
const challenge = "Fight Legends was an early-stage Web3 game. The team had to make an unfinished product understandable, keep prospective players engaged between development milestones, and turn ongoing progress into content that could support community growth, awareness, and key-pass sales.";
const myRole = "I created and ran a recurring development show that turned weekly product progress into a steady stream of content. I owned the show concept, format, visual direction, editing, and social distribution, while also supporting Discord events, AMAs, contests, and paid promotion that kept the community active between major updates.";
const system = "The weekly development show organized product updates into a clear narrative, generated short-form social content, and gave the community recognizable hosts and a predictable reason to return. AMAs, game nights, contests, and lore content extended that rhythm between milestones.";
const supportingResult = "Built a recurring content and community rhythm around development updates, AMAs, contests, and game nights";
const lesson = "Human-led storytelling made the unfinished game feel active, understandable, and worth following. Familiar hosts gave the project continuity, while the recurring format turned scattered development progress into a system that grew attention and engagement.";

const tags = ["development show", "community rhythm", "social distribution"];

const systemStages = [
  "Development progress",
  "Weekly development show",
  "Short-form social content",
  "Community activations",
  "Return for the next update",
];

const evidenceFrames = [
  {
    src: "/assets/fight-legends/progress-01.png",
    alt: "Early gray 3D character model from Fight Legends development footage",
    label: "Development progress",
  },
  {
    src: "/assets/fight-legends/progress-02.png",
    alt: "More detailed 3D character model from Fight Legends development footage",
    label: "Product milestone",
  },
  {
    src: "/assets/fight-legends/character-creation.png",
    alt: "Fight Legends character-creation interface",
    label: "Community-facing content",
  },
];

export default function FightLegendsCaseStudyPage() {
  return (
    <CaseStudyPage>
      <CaseStudyHero
        index="03"
        date="Content + community around product development"
        title={title}
        context={challenge}
        tags={tags}
      />

      <figure className={styles.heroEvidence}>
        <div className={styles.heroImage}>
          <Image
            src="/assets/fight-legends/hero-development.png"
            alt="In-development Fight Legends 3D character model"
            width={1280}
            height={720}
            sizes="(max-width: 900px) 100vw, 1200px"
            unoptimized
            priority
          />
        </div>
        <figcaption>
          <span>Production evidence</span>
          <p>In-development character footage used as source material for recurring content.</p>
        </figcaption>
      </figure>

      <CaseStudySection number="01" title="Challenge" headingId="challenge-heading">
        <ProseLead><p>{challenge}</p></ProseLead>
      </CaseStudySection>

      <CaseStudySection number="02" title="My Role" headingId="role-heading">
        <ProseLead><p>{myRole}</p></ProseLead>

        <figure className={styles.progressFigure}>
          <div className={styles.figureHeading}>
            <p>Progress Became Content</p>
            <span>Source footage</span>
          </div>
          <div className={styles.frameGrid}>
            {evidenceFrames.map((frame, index) => (
              <div className={styles.frame} key={frame.src}>
                <div className={styles.frameImage}>
                  <Image src={frame.src} alt={frame.alt} width={1280} height={720} sizes="(max-width: 800px) 100vw, 33vw" unoptimized />
                </div>
                <p><span>0{index + 1}</span>{frame.label}</p>
              </div>
            ))}
          </div>
          <figcaption>Visible development progress became material for recurring, human-led storytelling.</figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="03" title="The System" headingId="system-heading" variant="system">
        <figure className={styles.systemFigure}>
          <div className={styles.systemHeading}>
            <p>Recurring content engine</p>
            <span>Product development → community rhythm</span>
          </div>
          <div className={styles.systemTrack}>
            {systemStages.map((stage, index) => (
              <div className={styles.systemStage} key={stage}>
                <small>0{index + 1}</small>
                <strong>{stage}</strong>
              </div>
            ))}
          </div>
          <div className={styles.returnRail} aria-hidden="true"><span>Predictable reason to return</span></div>
          <figcaption>{system}</figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="04" title="Results" headingId="results-heading">
        <div className={styles.verifiedResults}>
          <article>
            <strong>25%</strong>
            <span>Increase in YouTube subscribers</span>
          </article>
          <article>
            <strong>Approximately 30%</strong>
            <span>Increase in social engagement</span>
          </article>
        </div>

        <div className={styles.estimateBlock}>
          <div className={styles.estimateHeading}>
            <p>Estimated production volume</p>
            <span>Estimates</span>
          </div>
          <div className={styles.estimateGrid}>
            <article><strong>Roughly 25 to 35</strong><span>development show episodes</span></article>
            <article><strong>Estimated 75 to 140</strong><span>short-form clips across the year</span></article>
          </div>
        </div>

        <p className={styles.supportingResult}>{supportingResult}</p>
      </CaseStudySection>

      <CaseStudySection number="05" title="Assets" headingId="assets-heading">
        <div className={styles.assetGrid}>
          <article className={styles.assetVisual}>
            <div className={styles.assetImage}>
              <Image
                src="/assets/fight-legends/character-creation.png"
                alt="Fight Legends character-creation interface"
                width={1280}
                height={720}
                sizes="(max-width: 800px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div><span>Source footage</span><h3>Character creation</h3></div>
          </article>

          <article className={styles.loreCard}>
            <span>Selected worldbuilding</span>
            <h3>One narrative world, organized over time.</h3>
            <ol>
              <li><span>01</span>Fagan City</li>
              <li><span>02</span>The Rifts</li>
              <li><span>03</span>Rift Wars</li>
              <li><span>04</span>The Agency</li>
            </ol>
          </article>
        </div>
      </CaseStudySection>

      <CaseStudySection number="06" title="Lessons" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={[lesson]} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
