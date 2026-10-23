import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  ChallengeContribution,
  SystemFlow,
} from "../case-study-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ava Labs — Developer Engagement Manager",
};

const title = "Ava Labs — Developer Engagement Manager";
const date = "Oct 2024 to Oct 2025";
const context = "Ava Labs is the team behind Avalanche, creating high performance blockchain infrastructure, developer tools, and programs to support app and chain builders.";
const opening = [
  "Avalanche needed to identify promising developers, understand their needs, and connect them with programs, events, and technical support that would help them build long-term projects. As part of a small engagement team, I managed relationships from first contact through qualified interest, program participation, and technical handoff.",
  "I led daily outreach on X, held prospect calls, and routed builders to Elevate, Builders Hub, Hackathons, Team1, Business Development where appropriate, and ecosystem partners based on their goals. I partnered with Sprinklr specialists on dashboards for lead visibility and funnel tracking, using UTM-tagged links to measure channels Sprinklr could not reach. I consistently ranked among the team’s strongest performers for click-through rate and lead discovery.",
];

const capabilities = [
  {
    title: "Lead discovery and community listening",
    items: ["Search workflows across Sprinklr and native X to uncover quality leads"],
  },
  {
    title: "Funnel measurement and conversion optimization",
    items: ["UTM tracking expertise for non native channels", "Funnel design, reporting, and conversion copywriting"],
  },
  {
    title: "Cross-functional campaign operations",
    items: ["Cross functional collaboration with Sprinklr operations and Business Development teams"],
  },
];

const tags = ["devrel", "growth", "sprinklr", "utm", "web3", "community", "content", "bd", "xspaces"];

const systemNodes = [
  { label: "A", title: "Builder discovery", details: ["Sprinklr search and native X tools"] },
  { label: "B", title: "Needs qualification" },
  {
    label: "C",
    title: "Program and partner routing",
    columns: [
      ["Elevate", "Builders Hub", "Hackathons", "Team1"],
      ["Business Development", "Ecosystem partners"],
    ],
  },
  { label: "D", title: "Tracking and reporting", details: ["UTM tracking", "Dashboard reporting"] },
];

const outcomes = [
  { value: "9,000+", label: "developers engaged" },
  { value: "6,900+", label: "visits to programs, resources, and events" },
  { value: "Helped double program conversions from Q1 to Q2", label: "Program conversions", prose: true },
];

function MetricRows({ metrics }: { metrics: readonly { label: string; value: string; prose?: boolean }[] }) {
  return (
    <dl className={styles.metricRows}>
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd className={metric.prose ? styles.resultText : undefined}>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function AvaLabsCaseStudyPage() {
  return (
    <CaseStudyPage className={styles.page}>
      <CaseStudyHero
        index="01"
        date={date}
        title={title}
        context={context}
        tags={tags}
        narrative={<ChallengeContribution paragraphs={opening} />}
        visual={(
          <figure className={styles.elevateFigure}>
            <div className={styles.elevateImage}>
              <Image
                src="/assets/ava-elevate-developer-series.png"
                alt="Elevate Developer Series program graphic"
                width={1014}
                height={560}
                sizes="(max-width: 920px) calc(100vw - 36px), 40vw"
                priority
              />
            </div>
            <figcaption>Elevate Developer Series was one of the programs I connected builders with.</figcaption>
          </figure>
        )}
      />

      <CaseStudySection number="03" title="How It Worked" headingId="system-heading" variant="system">
        <SystemFlow
          nodes={systemNodes}
          caption="Reconstructed from the approved role scope: builder discovery, qualification, program and partner routing, tracking, and performance reporting."
        />
      </CaseStudySection>

      <CaseStudySection number="04" title="Outcomes & Evidence" headingId="results-heading">
        <div className={styles.resultsSummary}>
          <p className={styles.attribution}>Team / program outcomes</p>
          <MetricRows metrics={outcomes} />
        </div>
      </CaseStudySection>

      <CaseStudySection number="05" title="What This Work Demonstrates" headingId="capabilities-heading">
        <div className={styles.capabilities}>
          {capabilities.map((capability) => (
            <article key={capability.title}>
              <h3>{capability.title}</h3>
              {capability.items.map((item) => <p key={item}>{item}</p>)}
            </article>
          ))}
        </div>
      </CaseStudySection>
    </CaseStudyPage>
  );
}
