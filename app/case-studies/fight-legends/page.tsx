import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  ChallengeContribution,
  LessonsList,
} from "../case-study-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fight Legends",
};

const title = "Fight Legends";
const summary = "Making a game in development understandable and worth following through recurring development shows, early worldbuilding, and community storytelling.";
const opening = [
  "Fight Legends needed to make an unfinished Web3 game understandable and keep prospective players engaged between milestones, with content supporting awareness, community growth, and key-pass sales. Artists conceptualized the characters, with team brainstorming. During development, I developed and wrote the worldbuilding, character lore, matchup stories, and game-mode explanations from those inputs or from scratch.",
  "I also created and ran a recurring development show, owning its concept, format, visual direction, editing, and social distribution to turn weekly progress into content. I supported Discord events, AMAs, contests, and paid promotion between major updates.",
];
const system = "The weekly development show organized product updates into a clear narrative, generated short-form social content, and gave the community recognizable hosts and a predictable reason to return. AMAs, game nights, contests, and lore content extended that rhythm between milestones.";
const supportingResult = "Built a recurring content and community rhythm around development updates, AMAs, contests, and game nights";
const lesson = "Human-led storytelling made the unfinished game feel active, understandable, and worth following. Familiar hosts gave the project continuity, while the recurring format turned scattered development progress into a system that grew attention and engagement.";

const tags = ["worldbuilding", "narrative writing", "development show", "community rhythm"];

const writingSamples = [
  { title: "Introducing Nix", format: "Character lore", description: "A character introduction connecting Nix’s backstory, motivations, and cybernetic abilities.", href: "/content/fight-legends/introducing-nix" },
  { title: "Nix vs Ross Levine", format: "Matchup storytelling", description: "A fantasy tournament preview framing the fighters’ contrasting styles and paths to victory.", href: "/content/fight-legends/nix-vs-ross-levine" },
  { title: "Story Mode", format: "Player-facing game explanation", description: "An explanation of the planned story mode, connecting character discovery with progression and gameplay.", href: "/content/fight-legends/story-mode" },
];

export default function FightLegendsCaseStudyPage() {
  return (
    <CaseStudyPage className={styles.page}>
      <CaseStudyHero
        index="03"
        date="Content + community around product development"
        title={title}
        summary={summary}
        narrative={<ChallengeContribution paragraphs={opening} />}
        tags={tags}
        visual={
          <figure className={styles.heroEvidence}>
            <div className={styles.heroImage}>
              <Image
                src="/assets/fight-legends/dev-update-22-poster.png"
                alt="Fight Legends development update episode 22, showing the branded show and its two presenters"
                width={1280}
                height={720}
                sizes="(max-width: 920px) calc(100vw - 36px), 40vw"
                unoptimized
                priority
              />
            </div>
            <figcaption>Fight Legends development show · Episode 22</figcaption>
          </figure>
        }
      />

      <CaseStudySection number="03" title="How It Worked" headingId="system-heading" variant="system">
        <div className={styles.storyStrands}>
          <article>
            <h3>Build the fictional world</h3>
            <p>Worldbuilding and character lore gave the developing game a narrative foundation. Matchup stories and game-mode explanations translated characters and game systems into player-facing content.</p>
          </article>
          <article>
            <h3>Make development worth following</h3>
            <p>{system}</p>
          </article>
        </div>
        <p className={styles.connection}>Two connected strands: giving the game’s world meaning and making its ongoing development visible.</p>
      </CaseStudySection>

      <CaseStudySection number="04" title="Selected Work" headingId="assets-heading">
        <p className={styles.artifactNote}>Narrative writing by me, developed during production from artist-created character concepts, team input, and original writing. These samples describe a game in development, not a claim that every planned feature shipped.</p>
        <div className={styles.writingGrid}>
          {writingSamples.map((sample) => (
            <article key={sample.title}>
              <span>{sample.format}</span>
              <h3>{sample.title}</h3>
              <p>{sample.description}</p>
              <Link href={sample.href}>Read {sample.title} <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
        <article className={styles.worldContext}>
          <h3>Worldbuilding context</h3>
          <p>Fagan City · The Rifts · Rift Wars · The Agency</p>
        </article>
      </CaseStudySection>

      <CaseStudySection number="04" title="Explore the visual work" headingId="visual-work-heading">
        <div className={styles.collectionBridge}>
          <Link href="/content/fight-legends" aria-label="Browse the Fight Legends visual collection">
            <Image src="/assets/fight-legends/name-that-character-bridge.webp" alt="Fight Legends Name That Character-style presentation with layered grayscale character panels" width={900} height={479} sizes="(max-width: 640px) 100vw, 360px" unoptimized />
          </Link>
          <div>
            <p>Character development, livestream presentation, and community-facing game content.</p>
            <Link className={styles.collectionAction} href="/content/fight-legends">Browse the Fight Legends visual collection →</Link>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection number="05" title="Outcomes & Evidence" headingId="results-heading">
        <p className={styles.artifactNote}>These figures describe channel activity and estimated show production, not measured impact attributable to the narrative writing.</p>
        <div className={styles.resultsGroup}>
          <h3>Team/channel outcomes</h3>
          <div className={styles.channelResults}>
            <article>
              <strong>25%</strong>
              <span>Increase in YouTube subscribers</span>
            </article>
            <article>
              <strong>Approximately 30%</strong>
              <span>Increase in social engagement</span>
            </article>
          </div>
        </div>

        <div className={styles.resultsGroup}>
          <h3>Personal production estimates</h3>
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
        </div>

        <p className={styles.supportingResult}>{supportingResult}</p>
      </CaseStudySection>

      <CaseStudySection number="06" title="What I Learned" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={[lesson]} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
