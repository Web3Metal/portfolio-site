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
  title: "Edge of Company",
};

const title = "Edge of Company";
const opening = [
  "Edge of Company had strong interviews and an established audience, but fragmented production and distribution. The team needed a repeatable workflow without relying on hosts to manage every moving part. I managed that workflow: producing branded video sessions, monitoring audio and visual quality, editing social clips, coordinating supporting assets, and publishing across podcast and video platforms. I also helped keep the broader social content pipeline moving.",
];
const system = "Each interview moved through a repeatable production pipeline: branded recording, quality control, editing, clip creation, asset coordination, publishing, and social distribution. That system reduced friction for the hosts and turned each long-form conversation into a full set of cross-platform content.";
const lesson = "A strong production system can turn one long-form interview into a coordinated stream of content across video, podcast, and social channels—without forcing the hosts to carry the operational load.";

const tags = ["branded video", "social clips", "cross-platform content"];

const pipeline = [
  "Branded recording",
  "Quality control",
  "Editing",
  "Clip creation",
  "Asset coordination",
  "Publishing",
  "Social distribution",
];

const socialResults = [
  { value: "24,300", label: "additional profile visits" },
  { value: "35%", label: "follower growth" },
  { value: "4,000+", label: "followers added in 30 days" },
  { value: "28%", label: "increase in impressions in 30 days" },
];

const youtubeResults = [
  { value: "193", label: "YouTube subscribers added" },
  { value: "17,800", label: "additional YouTube views" },
  { value: "49.4 hours", label: "YouTube watch time added" },
];

export default function EdgeOfCompanyCaseStudyPage() {
  return (
    <CaseStudyPage className={styles.page}>
      <CaseStudyHero
        index="04"
        date="Production and distribution workflow"
        title={title}
        narrative={<ChallengeContribution paragraphs={opening} />}
        tags={tags}
        visual={(
          <figure className={styles.heroEvidence}>
            <div className={styles.heroImage}>
              <Image
                src="/assets/future-of-storytelling.jpeg"
                alt="Edge of NFT episode artwork for The Future of Storytelling with Henry Finn"
                width={1280}
                height={720}
                sizes="(max-width: 1000px) 100vw, 520px"
                unoptimized
                priority
              />
            </div>
            <figcaption>
              <span>Episode packaging</span>
              <p>Branded artwork supporting an Edge of NFT interview.</p>
            </figcaption>
          </figure>
        )}
      />

      <CaseStudySection number="03" title="How It Worked" headingId="system-heading" variant="system">
        <figure className={styles.pipelineFigure}>
          <div className={styles.figureHeading}>
            <p>Interview production pipeline</p>
            <span>Long-form conversation → cross-platform content</span>
          </div>
          <div className={styles.pipelineTrack}>
            {pipeline.map((stage, index) => (
              <div className={styles.pipelineStage} key={stage}>
                <small>{String.fromCharCode(65 + index)}</small>
                <strong>{stage}</strong>
              </div>
            ))}
          </div>
          <figcaption>{system}</figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="04" title="Explore the visual work" headingId="assets-heading">
        <div className={styles.collectionBridge}>
          <Link href="/content/edge-visuals" aria-label="Browse the Edge visual collection">
            <Image
              src="/assets/edge-of-company/art-basel-ed-zipco-gmoney.jpg"
              alt="Edge of NFT Art Basel thumbnail featuring Ed Zipco and Gmoney"
              width={766}
              height={431}
              sizes="(max-width: 640px) 100vw, 360px"
              unoptimized
            />
          </Link>
          <div>
            <p>Episode visual packaging, show overlays, and social adaptations.</p>
            <Link className={styles.collectionAction} href="/content/edge-visuals">Browse the Edge visual collection →</Link>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection number="05" title="Outcomes" headingId="results-heading">
        <p className={styles.attribution}>These are team/channel outcomes, not results attributed solely to my work.</p>
        <div className={styles.resultGroup}>
          <h3>Social-channel activity and growth</h3>
          <div className={styles.socialResults}>
            {socialResults.map((result) => (
              <article key={result.label}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.resultGroup}>
          <h3>YouTube outcomes</h3>
          <div className={styles.youtubeResults}>
            {youtubeResults.map((result) => (
              <article key={result.label}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </article>
            ))}
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection number="06" title="What I Learned" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={[lesson]} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
