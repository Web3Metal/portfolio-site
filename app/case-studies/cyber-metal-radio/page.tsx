import type { Metadata } from "next";
import {
  AssetCards,
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  EvidenceGrid,
  LessonsList,
  ProseLead,
} from "../case-study-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cyber Metal Radio",
};

const title = "Cyber Metal Radio";
const role = "Co-Founder and Growth Lead";
const challenge = "AI metal artists had plenty of places to upload music, but few spaces built around consistent discovery, recognition, and community ritual. Cyber Metal Radio set out to create a dedicated platform where artists could submit new work, reach listeners, participate in recurring weekly programming, and become part of a community with a shared rhythm people genuinely wanted to preserve.";
const myRole = "I led zero-to-one marketing and growth for Cyber Metal Radio, bringing together the early community that helped shape the station and turning it into a repeatable creator engagement system. I recruited artists, promoted weekly programming, supported submissions and chart participation, helped establish community rituals, and co-created the annual awards that extended recognition beyond the weekly cycle.";
const systemCaption = "Cyber Metal Radio developed a recurring creator loop: artists made new music, submitted it through New Metal Monday, returned for the weekly Top 15 countdown, shared the results, and came back to participate again. Listening parties, community discussion, and the annual awards added recognition at different levels, turning a radio station into a dependable rhythm of creation, discovery, and belonging.";
const lesson = "The retention engine gave artists a dependable reason to create, return, participate, and feel known.";

const tags = ["community", "growth", "creator-economy", "music", "programming", "retention", "zero-to-one", "awards"];

const loopStages = [
  "Artists create",
  "Submit",
  "Get discovered",
  "Community engages",
  "Artists return",
];

const headlineResults = [
  { value: "1,765", label: "artist submissions in 2025" },
  { value: "200,000+", label: "listens" },
  { value: "16,000+", label: "community interactions" },
];

const supportingResults = [
  { text: "Built a recurring weekly participation loop around New Metal Monday and the Top 15 countdown" },
  { text: "Established an annual awards program that expanded recognition beyond weekly chart performance" },
  { text: "Created a community strong enough that members actively wanted to preserve its culture as it grew" },
];

const assets = [
  {
    eyebrow: "Reconstructed system",
    title: "The Weekly Creator Loop",
    caption: "Built from the approved Cyber Metal Radio system description.",
  },
  {
    eyebrow: "Verified evidence",
    title: "Results Evidence Panel",
    caption: "Uses the approved public metrics: 1,765 artist submissions in 2025, 200,000+ listens, and 16,000+ community interactions.",
  },
];

export default function CyberMetalRadioCaseStudyPage() {
  return (
    <CaseStudyPage>
      <CaseStudyHero index="02" date={role} title={title} context={challenge} tags={tags} />

      <CaseStudySection number="01" title="Challenge" headingId="challenge-heading">
        <ProseLead><p>{challenge}</p></ProseLead>
      </CaseStudySection>

      <CaseStudySection number="02" title="My Role" headingId="role-heading">
        <ProseLead><p>{myRole}</p></ProseLead>
      </CaseStudySection>

      <CaseStudySection number="03" title="The System" headingId="system-heading" variant="system">
        <figure className={styles.loopFigure}>
          <div className={styles.loopHeading}>
            <p>Creator discovery and participation</p>
            <span>Repeatable participation engine</span>
          </div>
          <div className={styles.loopTrack}>
            {loopStages.map((stage, index) => (
              <div className={styles.loopStage} key={stage}>
                <small>0{index + 1}</small>
                <strong>{stage}</strong>
              </div>
            ))}
          </div>
          <div className={styles.returnRail} aria-hidden="true"><span>Return and participate again</span></div>
          <figcaption>{systemCaption}</figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="04" title="Results" headingId="results-heading">
        <div className={styles.metricPanel}>
          {headlineResults.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
            </article>
          ))}
        </div>
        <div className={styles.supportingResults}>
          <EvidenceGrid items={supportingResults} />
        </div>
      </CaseStudySection>

      <CaseStudySection number="05" title="Assets" headingId="assets-heading">
        <AssetCards cards={assets} />
      </CaseStudySection>

      <CaseStudySection number="06" title="Lessons" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={[lesson]} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
