import type { Metadata } from "next";
import Image from "next/image";
import {
  AssetCards,
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  EvidenceGrid,
  LessonsList,
  OutcomePair,
  ProgressionFigure,
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

const strengths = [
  "Ranked among the team's strongest performers for click through rate and lead discovery",
  "Search workflows across Sprinklr and native X to uncover quality leads",
  "UTM tracking expertise for non native channels",
  "Cross functional collaboration with Sprinklr operations and Business Development teams",
  "Funnel design, reporting, and conversion copywriting",
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
];

const progression = [
  { stage: "Outbound activity", value: "Roughly 10,000", label: "outreach posts" },
  { stage: "Initial interactions", value: "4,400+", label: "initial interactions" },
  { stage: "Continued conversations", value: "3,500+", label: "continued conversations" },
  { stage: "Follow-ups", value: "600+", label: "follow-ups" },
];

const evidence = [
  { value: "Approximately 1,700", label: "linked posts" },
  { value: "Approximately 2,100", label: "clicks" },
  { value: "29%", label: "improvement in clicks per message" },
  { text: "Ranked among the strongest team performers for click-through rate and lead discovery" },
  { text: "Helped double program conversions from Q1 to Q2" },
  { value: "229%", label: "month-over-month increase in Elevate conversions" },
];

const assets = [
  {
    eyebrow: "Reconstructed workflow",
    title: "Builder Discovery and Routing System",
    caption: "Reconstructed workflow — identities and private communications removed.",
  },
  {
    eyebrow: "Aggregate evidence",
    title: "Engagement Progression",
    caption: "Aggregate figures from the approved Ava Labs case-study Markdown.",
  },
];

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

      <CaseStudySection number="02" title="My Role" headingId="role-heading">
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

      <CaseStudySection number="03" title="The System" headingId="system-heading" variant="system">
        <SystemFlow
          nodes={systemNodes}
          caption="Reconstructed from the approved role scope: builder discovery, qualification, program and partner routing, tracking, and performance reporting."
        />
      </CaseStudySection>

      <CaseStudySection number="04" title="Results" headingId="results-heading">
        <div className={styles.resultsGroup}>
          <h3>Developer engagement</h3>
          <OutcomePair metrics={outcomes} />
        </div>
        <div className={styles.progression}>
          <ProgressionFigure
            title="Engagement Progression"
            eyebrow="Aggregate figures"
            metrics={progression}
            caption="Approved engagement totals show the progression from outbound activity to ongoing builder conversations and follow-up."
          />
        </div>
        <div className={styles.resultsGroup}>
          <h3>Linked outreach</h3>
          <EvidenceGrid items={[evidence[0], evidence[1], evidence[3]]} className={styles.metricGrid} />
        </div>
        <div className={styles.resultsGroup}>
          <h3>Program performance</h3>
          <EvidenceGrid items={[evidence[2], evidence[4], evidence[5]]} className={styles.metricGrid} />
        </div>
      </CaseStudySection>

      <CaseStudySection number="05" title="Assets" headingId="assets-heading">
        <AssetCards cards={assets} />
      </CaseStudySection>

      <CaseStudySection number="06" title="Lessons" headingId="lessons-heading" variant="lessons">
        <LessonsList lessons={strengths} />
      </CaseStudySection>
    </CaseStudyPage>
  );
}
