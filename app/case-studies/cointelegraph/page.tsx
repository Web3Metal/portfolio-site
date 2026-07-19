import type { Metadata } from "next";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  EvidenceGrid,
  LessonsList,
  ProseLead,
} from "../case-study-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cointelegraph Media",
};

const title = "Cointelegraph Media";
const challenge = "Cointelegraph Media’s agency team managed social content for multiple blockchain clients with different products, audiences, and levels of technical complexity. The challenge was turning each client’s goals into clear, platform-ready campaigns without flattening them into the same generic crypto voice.";
const myRole = "I managed social content across multiple blockchain clients, translating technical products and campaign goals into clear copy, visual briefs, publishing plans, and platform-specific posts. I coordinated with designers, scheduled and published content, and used performance data to refine what we produced.";
const system = "Each client moved through the same core workflow: understand the product and campaign goal, translate it into a clear content angle, coordinate the visual execution, publish across the right channels, and use performance data to adjust future work. The structure stayed consistent while the voice and message changed by client.";
const assets = "Original campaign files from this work are not currently available. The reconstructed workflow above documents the repeatable process used across copy, visual coordination, publishing, and performance-led iteration for multiple client accounts.";
const lesson = "A repeatable production workflow makes it possible to manage multiple clients while preserving a distinct voice for each one.";

const tags = ["clear copy", "publishing plans", "platform-specific posts"];

const workflow = [
  "understand the product and campaign goal",
  "translate it into a clear content angle",
  "coordinate the visual execution",
  "publish across the right channels",
  "use performance data to adjust future work",
];

const results = [
  "Managed social content for 2–3 blockchain clients",
  "Turned technical products into clear, platform-ready campaigns",
  "Built repeatable workflows across copy, design coordination, publishing, and optimization",
  "Adapted voice and messaging by client without losing operational consistency",
  "Supported ongoing campaign execution across multiple accounts at once",
];

export default function CointelegraphCaseStudyPage() {
  return (
    <CaseStudyPage>
      <CaseStudyHero
        index="06"
        date="Multiple blockchain clients"
        title={title}
        context={challenge}
        tags={tags}
      />

      <CaseStudySection number="01" title="Challenge" headingId="challenge-heading">
        <ProseLead><p>{challenge}</p></ProseLead>
      </CaseStudySection>

      <CaseStudySection number="02" title="My Role" headingId="role-heading">
        <ProseLead><p>{myRole}</p></ProseLead>
      </CaseStudySection>

      <CaseStudySection number="03" title="The System" headingId="system-heading" variant="system">
        <figure className={styles.workflowFigure}>
          <div className={styles.workflowGrid}>
            {workflow.map((stage, index) => (
              <div className={styles.workflowStage} key={stage}>
                <small>0{index + 1}</small>
                <strong>{stage}</strong>
              </div>
            ))}
          </div>
          <figcaption>{system}</figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="04" title="Results" headingId="results-heading">
        <EvidenceGrid items={results.map((text) => ({ text }))} />
      </CaseStudySection>

      <CaseStudySection number="05" title="Assets" headingId="assets-heading">
        <div className={styles.assetNote}>
          <p>{assets}</p>
        </div>
      </CaseStudySection>

      <CaseStudySection number="06" title="Lessons" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={[lesson]} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
