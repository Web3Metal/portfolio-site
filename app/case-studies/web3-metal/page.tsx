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
  title: "Web3 Metal",
};

const title = "Web3 Metal";
const challenge = "Heavy music creators working in Web3 and AI music were scattered across platforms with no dedicated place for news, discovery, collaboration, or community. Web3 Metal began as an attempt to document that emerging scene and grew into an expanding creative ecosystem connecting artists, experiments, competitions, editorial work, and projects like Cyber Metal Radio.";
const myRole = "I founded Web3 Metal and continue to lead its growth as an expanding creator ecosystem. I shape the brand, publish and promote emerging work, develop community programming, organize competitions and collaborations, and connect artists, builders, and projects across Web3, AI music, and heavy music culture.";
const system = "Web3 Metal operates as a connected creative ecosystem rather than a single publication or community. Editorial coverage, social content, Discord programming, competitions, collaborations, creator support, and original product experiments feed into one another. The long-term aim is to bring artists and builders together to develop new tools, platforms, and experiences around emerging music technology.";
const lesson = "Building the thing created the evidence for what people actually wanted. Web3 Metal started with publishing, but participation revealed the stronger opportunities: community, competitions, radio, and eventually new creative tools.";

const tags = ["editorial coverage", "Discord programming", "creator support"];

const ecosystem = [
  "Editorial coverage",
  "Social content",
  "Discord programming",
  "Competitions",
  "Collaborations",
  "Creator support",
  "Original product experiments",
];

const primaryResults = [
  { value: "192", label: "Discord members" },
  { value: "27", label: "newsletter issues" },
  { value: "37.59%", label: "open rate" },
  { value: "20%", label: "click-to-open rate" },
];

const continuedResults = [
  "Helped launch Cyber Metal Radio, which generated 1,765 artist submissions, 200,000+ listens, and 16,000+ interactions in 2025",
  "Created recurring competitions, collaborations, and creator programming",
  "Established the foundation for future tools, platforms, and creative technology projects",
];

const assetInventory = [
  "Newsletter issue archive and performance dashboard",
  "Discord community screenshots",
  "Competition and collaboration graphics",
  "Editorial coverage and social posts",
  "Cyber Metal Radio launch materials",
  "Early prototypes or concept visuals for original tools and platform experiments",
];

export default function Web3MetalCaseStudyPage() {
  return (
    <CaseStudyPage>
      <CaseStudyHero
        index="05"
        date="Expanding creator ecosystem"
        title={title}
        context={challenge}
        tags={tags}
      />

      <figure className={styles.heroEvidence}>
        <div className={styles.heroImage}>
          <img
            src="/assets/newsletter-metal-gods.png"
            alt="Web3 Metal newsletter artwork featuring Metal Gods"
          />
        </div>
        <figcaption>
          <span>Newsletter issue archive</span>
          <p>Web3 Metal</p>
        </figcaption>
      </figure>

      <CaseStudySection number="01" title="Challenge" headingId="challenge-heading">
        <ProseLead><p>{challenge}</p></ProseLead>
      </CaseStudySection>

      <CaseStudySection number="02" title="My Role" headingId="role-heading">
        <ProseLead><p>{myRole}</p></ProseLead>

        <figure className={styles.videoEvidence}>
          <div className={styles.videoFrame}>
            <video controls playsInline preload="metadata" aria-describedby="web3-metal-video-caption">
              <source src="/assets/dadabots-interview-clip-web.mp4" type="video/mp4" />
              Your browser does not support embedded video. You can open the
              <a href="/assets/dadabots-interview-clip-web.mp4"> interview clip</a> instead.
            </video>
          </div>
          <figcaption id="web3-metal-video-caption">
            <span>Editorial coverage and social posts</span>
            <div>
              <h3>Publish and promote emerging work.</h3>
              <p>Connect artists, builders, and projects across Web3, AI music, and heavy music culture.</p>
            </div>
          </figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="03" title="The System" headingId="system-heading" variant="system">
        <figure className={styles.ecosystemFigure}>
          <div className={styles.figureHeading}>
            <p>Connected creative ecosystem</p>
            <span>Rather than a single publication or community</span>
          </div>
          <div className={styles.ecosystemGrid}>
            <div className={styles.logoPanel}>
              <img src="/assets/web3-metal-logo.png" alt="Web3 Metal logo" />
            </div>
            {ecosystem.map((item, index) => (
              <div className={styles.ecosystemItem} key={item}>
                <small>0{index + 1}</small>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <figcaption>{system}</figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection number="04" title="Results" headingId="results-heading">
        <div className={styles.primaryResults}>
          {primaryResults.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
            </article>
          ))}
        </div>

        <div className={styles.continuedResults}>
          <div className={styles.figureHeading}>
            <p>Results</p>
            <span>Community, participation, and future projects</span>
          </div>
          <ol>
            {continuedResults.map((result, index) => (
              <li key={result}><span>0{index + 1}</span><p>{result}</p></li>
            ))}
          </ol>
        </div>
      </CaseStudySection>

      <CaseStudySection number="05" title="Assets" headingId="assets-heading">
        <div className={styles.assetGallery}>
          <figure className={styles.assetLead}>
            <img src="/assets/newsletter-onchain-releases.png" alt="Web3 Metal newsletter artwork covering onchain releases" />
            <figcaption><span>01</span>Newsletter issue archive</figcaption>
          </figure>
          <figure>
            <img src="/assets/discord-programming.png" alt="Web3 Metal Discord programming artwork" />
            <figcaption><span>02</span>Discord community</figcaption>
          </figure>
          <figure>
            <img src="/assets/suno-metal-editorial.png" alt="Web3 Metal editorial artwork about metal made with Suno" />
            <figcaption><span>03</span>Editorial coverage</figcaption>
          </figure>
        </div>

        <div className={styles.assetInventory}>
          <p>Assets</p>
          <ol>
            {assetInventory.map((asset, index) => (
              <li key={asset}><span>0{index + 1}</span>{asset}</li>
            ))}
          </ol>
        </div>
      </CaseStudySection>

      <CaseStudySection number="06" title="Lessons" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={[lesson]} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
