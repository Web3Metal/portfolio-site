import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  ProseLead,
  SystemFlow,
} from "../case-study-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ava Labs — Developer Engagement Manager",
};

const title = "Ava Labs — Developer Engagement Manager";
const date = "Oct 2024 to Oct 2025";
const context = "Ava Labs is the team behind Avalanche, creating high performance blockchain infrastructure, developer tools, and programs to support app and chain builders.";
const challenge = "Avalanche wanted to increase the number of developers building long term projects in its ecosystem. The challenge wasn't simply generating awareness. It was identifying promising developers, understanding where they were in their journey, and connecting them with the right programs, events, and internal teams to help them continue building.";
const roleOverview = "Part of a small engagement team driving developer adoption of Avalanche. Managed developer relationships from first interaction through qualified interest, program participation, and handoff to deeper technical support.";

const scope = [
  "Led day to day developer outreach on X and consistently ranked among the team's strongest performers for click through rate and lead discovery",
  "Partnered with Sprinklr specialists to design dashboards that improved lead visibility and funnel tracking",
  "Used UTM tagged links to measure clicks in channels Sprinklr could not reach, ensuring full funnel visibility",
  "Qualified leads and routed them into Avalanche builder programs, including Elevate, Builders Hub, Hackathons, and Team1",
  "Held video calls with prospects, referred projects to Business Development when appropriate, and connected builders to ecosystem partners based on needs and goals",
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
        narrative={(
          <section className={styles.heroChallenge} aria-labelledby="challenge-heading">
            <h2 id="challenge-heading">Challenge</h2>
            <p>{challenge}</p>
          </section>
        )}
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

      <CaseStudySection number="02" title="My Contribution" headingId="role-heading">
        <ProseLead className={styles.lead}><p>{roleOverview}</p></ProseLead>
        <div className={styles.contributions}>
          {[
            { title: "Discover builders", items: [scope[0]] },
            { title: "Qualify and connect", items: [scope[3], scope[4]] },
            { title: "Track and report", items: [scope[1], scope[2]] },
          ].map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map((item) => <p key={item}>{item}</p>)}
            </article>
          ))}
        </div>
      </CaseStudySection>

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
