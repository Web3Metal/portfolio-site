import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  ChallengeContribution,
  EvidenceGrid,
  LessonsList,
  ProseLead,
} from "../case-study-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Web3 Metal & Cyber Metal Radio",
  description: "How Web3 Metal and Cyber Metal Radio connected editorial work, music discovery, and a niche creator community around Web3 and AI music.",
};

const title = "Web3 Metal & Cyber Metal Radio";
const summary = "Building media and community systems at the intersection of music and technology";
const stationUrl = "https://www.cybermetalradio.com/";
const opening = [
  "Artists exploring Web3 and AI music had places to upload work, but fewer spaces for discovery, recognition, and community. As Web3 Metal’s founder, I helped grow its Discord and developed editorial coverage, social content, and community programming, including competitions, collaborations, and creator support.",
  "Cyber Metal Radio formed in that Discord, operating there for months before moving to its own server for independence and efficiency. It remained a distinct music-discovery project. As co-founder, I helped build its initial community by recruiting artists, promoting weekly programming, supporting submissions and chart participation, establishing rituals, and co-creating annual awards. After the team chose not to pursue further audience growth, the focus shifted to sustaining the niche community rather than maximizing expansion, over roughly the last year and a half to two years.",
];
const systemCaption = "Artists submitted work through New Metal Monday, returned for the weekly Top 15 countdown, and shared the results. Listening parties and annual awards added more ways to discover music and recognize artists.";
const lesson = "A community does not always need to keep expanding to be successful. A recurring reason to submit, listen, return, and recognize one another can help a niche community stay active while preserving what makes it feel distinct.";

const tags = ["Music technology", "Editorial", "Creator community", "Radio"];

const loopStages = [
  "Submit through New Metal Monday",
  "Return for the Top 15",
  "Share the results",
  "Discover more music",
  "Participate again",
];

const radioActivity = [
  { value: "1,765", label: "artist submissions in 2025 · team/platform activity" },
  { value: "200,000+", label: "listens · team/platform activity" },
  { value: "16,000+", label: "community interactions · team/platform activity" },
];

const web3MetalActivity = [
  { text: "Web3 Metal Discord: 192 members" },
  { text: "27 newsletter issues" },
  { text: "37.59% newsletter open rate" },
  { text: "20% click-to-open rate" },
];

export default function MusicTechnologyCommunityCaseStudyPage() {
  return (
    <CaseStudyPage className={styles.compactCaseStudy}>
      <CaseStudyHero
        index="02"
        date="Oct 2023 – Present"
        title={title}
        summary={summary}
        narrative={<ChallengeContribution paragraphs={opening} />}
        tags={tags}
        visual={(
          <figure className={styles.heroEvidence}>
            <div className={styles.heroImage}>
              <Image
                src="/assets/cyber-metal-radio/station-dashboard.png"
                alt="Cyber Metal Radio station dashboard showing its listening and programming interface"
                width={1892}
                height={917}
                sizes="(max-width: 900px) 100vw, 44vw"
                unoptimized
                priority
              />
            </div>
            <figcaption>
              <span>Cyber Metal Radio</span>
              <a href={stationUrl} target="_blank" rel="noreferrer">Listen live <span aria-hidden="true">↗</span></a>
              <p>Cyber Metal Radio’s station and programming interface.</p>
            </figcaption>
          </figure>
        )}
      />

      <CaseStudySection number="03" title="How It Worked" headingId="system-heading" variant="system">
        <figure className={styles.loopFigure}>
          <div className={styles.loopHeading}>
            <p>Music discovery and participation</p>
            <span>Recurring community programming</span>
          </div>
          <div className={styles.loopTrack}>
            {loopStages.map((stage, index) => (
              <div className={styles.loopStage} key={stage}>
                <small>{String.fromCharCode(65 + index)}</small>
                <strong>{stage}</strong>
              </div>
            ))}
          </div>
          <div className={styles.returnRail} aria-hidden="true"><span>Return and participate again</span></div>
          <figcaption>{systemCaption}</figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="04" title="Outcomes" headingId="activity-heading">
        <ProseLead className={styles.activityQualifier}><p>These are measures of activity across the projects, not results attributed solely to my work.</p></ProseLead>
        <div className={styles.resultsGroup}>
          <h3>Cyber Metal Radio · Team/platform activity</h3>
          <div className={styles.metricPanel}>
            {radioActivity.map((result) => (
              <article key={result.label}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </article>
            ))}
          </div>
        </div>
        <div className={`${styles.supportingResults} ${styles.web3MetalActivity}`}>
          <h3>Web3 Metal</h3>
          <EvidenceGrid items={web3MetalActivity} className={styles.web3MetalGrid} />
        </div>
      </CaseStudySection>

      <CaseStudySection number="05" title="What I Learned" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={[lesson]} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
