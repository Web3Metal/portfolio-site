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
  title: "Edge of Company",
};

const title = "Edge of Company";
const challenge = "Edge of Company had strong interview content and an established audience, but production and distribution were fragmented. The team needed a repeatable system for preparing recordings, producing branded video, publishing across platforms, and turning each episode into social content without relying on the hosts to manage every moving part.";
const myRole = "I managed the production and distribution workflow around Edge of Company’s interview programming.";
const contributions = [
  { title: "Produce branded interviews", text: "I produced branded video sessions and monitored audio and visual quality." },
  { title: "Edit and package episodes", text: "I edited episodes into social clips and coordinated supporting assets." },
  { title: "Publish and distribute content", text: "I published across podcast and video platforms and helped keep the broader social content pipeline moving." },
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

const assetInventory = [
  "Branded interview recording or episode clip",
  "Before-and-after examples of the video presentation",
  "Short-form social clips",
  "Podcast and YouTube publishing examples",
  "Social campaign graphics",
  "Outer Edge LA interview footage",
  "Analytics screenshots supporting the growth metrics",
];

export default function EdgeOfCompanyCaseStudyPage() {
  return (
    <CaseStudyPage className={styles.page}>
      <CaseStudyHero
        index="04"
        date="Production and distribution workflow"
        title={title}
        context={challenge}
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

      <CaseStudySection number="02" title="My Contribution" headingId="role-heading">
        <ProseLead className={styles.lead}><p>{myRole}</p></ProseLead>
        <div className={styles.contributions}>
          {contributions.map((contribution) => (
            <article key={contribution.title}>
              <h3>{contribution.title}</h3>
              <p>{contribution.text}</p>
            </article>
          ))}
        </div>
      </CaseStudySection>

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

      <CaseStudySection number="04" title="Selected Work" headingId="assets-heading">
        <figure className={styles.videoEvidence}>
          <div className={styles.videoFrame}>
            <video
              controls
              playsInline
              preload="metadata"
              aria-describedby="edge-video-caption"
            >
              <source
                src="/assets/interview-short-form-web.mp4"
                type="video/mp4"
              />
              Your browser does not support embedded video. You can open the
              <a href="/assets/interview-short-form-web.mp4"> short-form interview clip</a> instead.
            </video>
          </div>
          <figcaption id="edge-video-caption">
            <span>Short-form production</span>
            <div>
              <h3>One interview, prepared for social distribution.</h3>
              <p>A branded vertical edit with speaker identification and platform-ready framing.</p>
            </div>
          </figcaption>
        </figure>
        <div className={styles.assetLayout}>
          <div className={styles.assetGallery}>
            <figure>
              <Image
                src="/assets/edge-of-ai-launch.jpeg"
                alt="Edge of AI podcast launch artwork featuring Ron Levy"
                width={680}
                height={383}
                sizes="(max-width: 800px) 100vw, 50vw"
                unoptimized
              />
              <figcaption><span>A</span>Edge of AI launch</figcaption>
            </figure>
            <figure>
              <Image
                src="/assets/swoops-episode.jpeg"
                alt="Edge of NFT episode artwork featuring SWOOPS and David Goldberg"
                width={680}
                height={383}
                sizes="(max-width: 800px) 100vw, 50vw"
                unoptimized
              />
              <figcaption><span>B</span>SWOOPS episode</figcaption>
            </figure>
          </div>

          <div className={styles.assetInventory}>
            <p>Approved asset scope</p>
            <ol>
              {assetInventory.map((asset, index) => (
                <li key={asset}><span>{String.fromCharCode(65 + index)}</span>{asset}</li>
              ))}
            </ol>
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
