import type { Metadata } from "next";
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
const myRole = "I managed the production and distribution workflow around Edge of Company’s interview programming. I produced branded video sessions, monitored audio and visual quality, edited episodes into social clips, coordinated supporting assets, published across podcast and video platforms, and helped keep the broader social content pipeline moving.";
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
    <CaseStudyPage>
      <CaseStudyHero
        index="04"
        date="Production and distribution workflow"
        title={title}
        context={challenge}
        tags={tags}
      />

      <figure className={styles.heroEvidence}>
        <div className={styles.heroImage}>
          <img
            src="/assets/future-of-storytelling.jpeg"
            alt="Edge of NFT episode artwork for The Future of Storytelling with Henry Finn"
          />
        </div>
        <figcaption>
          <span>Episode packaging</span>
          <p>Branded artwork supporting an Edge of NFT interview.</p>
        </figcaption>
      </figure>

      <CaseStudySection number="01" title="Challenge" headingId="challenge-heading">
        <ProseLead><p>{challenge}</p></ProseLead>
      </CaseStudySection>

      <CaseStudySection number="02" title="My Role" headingId="role-heading">
        <ProseLead><p>{myRole}</p></ProseLead>

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
      </CaseStudySection>

      <CaseStudySection number="03" title="The System" headingId="system-heading" variant="system">
        <figure className={styles.pipelineFigure}>
          <div className={styles.figureHeading}>
            <p>Interview production pipeline</p>
            <span>Long-form conversation → cross-platform content</span>
          </div>
          <div className={styles.pipelineTrack}>
            {pipeline.map((stage, index) => (
              <div className={styles.pipelineStage} key={stage}>
                <small>0{index + 1}</small>
                <strong>{stage}</strong>
              </div>
            ))}
          </div>
          <figcaption>{system}</figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="04" title="Results" headingId="results-heading">
        <div className={styles.socialResults}>
          {socialResults.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
            </article>
          ))}
        </div>

        <div className={styles.youtubePanel}>
          <div className={styles.figureHeading}>
            <p>YouTube growth</p>
            <span>Additional results</span>
          </div>
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

      <CaseStudySection number="05" title="Assets" headingId="assets-heading">
        <div className={styles.assetLayout}>
          <div className={styles.assetGallery}>
            <figure>
              <img
                src="/assets/edge-of-ai-launch.jpeg"
                alt="Edge of AI podcast launch artwork featuring Ron Levy"
              />
              <figcaption><span>01</span>Edge of AI launch</figcaption>
            </figure>
            <figure>
              <img
                src="/assets/swoops-episode.jpeg"
                alt="Edge of NFT episode artwork featuring SWOOPS and David Goldberg"
              />
              <figcaption><span>02</span>SWOOPS episode</figcaption>
            </figure>
          </div>

          <div className={styles.assetInventory}>
            <p>Approved asset scope</p>
            <ol>
              {assetInventory.map((asset, index) => (
                <li key={asset}><span>0{index + 1}</span>{asset}</li>
              ))}
            </ol>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection number="06" title="Lessons" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={[lesson]} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
