import type { Metadata } from "next";
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
  RoleContent,
  SystemFlow,
} from "../case-study-components";

export const metadata: Metadata = {
  title: "Ava Labs — Developer Engagement Manager",
};

const title = "Ava Labs — Developer Engagement Manager";
const date = "Oct 2024 to Present";
const context = "Ava Labs is the team behind Avalanche, creating high performance blockchain infrastructure, developer tools, and programs to support app and chain builders.";
const roleOverview = "Part of a small engagement team driving developer adoption of Avalanche. Quickly emerged as the top engager, consistently leading the team in new lead discovery, link clicks, and downstream conversions. Specialized in using Sprinklr search and native X tools to identify and qualify builders, then routing them into programs like Elevate, Builders Hub, and Hackathons. Extended tracking beyond Sprinklr by building and deploying UTM tagged links, enabling click through measurement in otherwise untracked channels.";

const scope = [
  "Led day to day developer outreach on X, consistently ranking as the top performer on the team for engagement and lead discovery",
  "Partnered with Sprinklr specialists to design dashboards that improved lead visibility and funnel tracking",
  "Used UTM tagged links to measure clicks in channels Sprinklr could not reach, ensuring full funnel visibility",
  "Qualified leads and routed them into Avalanche builder programs, including Elevate, Builders Hub, Hackathons, and Team1",
  "Held video calls with prospects, referred projects to Business Development when appropriate, and connected builders to ecosystem partners based on needs and goals",
];

const strengths = [
  "Top engager in team metrics for click through rate and lead discovery",
  "Search workflows across Sprinklr and native X to uncover quality leads",
  "UTM tracking expertise for non native channels",
  "Cross functional collaboration with Sprinklr operations and Business Development teams",
  "Funnel design, reporting, and conversion copywriting",
];

const tags = ["devrel", "growth", "sprinklr", "utm", "web3", "community", "content", "bd", "xspaces"];

const systemNodes = [
  { label: "01", title: "Builder discovery", details: ["Sprinklr search and native X tools"] },
  { label: "02", title: "Needs qualification" },
  {
    label: "03",
    title: "Program and partner routing",
    columns: [
      ["Elevate", "Builders Hub", "Hackathons", "Team1"],
      ["Business Development", "Ecosystem partners"],
    ],
  },
  { label: "04", title: "Tracking and reporting", details: ["UTM tracking", "Dashboard reporting"] },
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
    <CaseStudyPage>
      <CaseStudyHero index="01" date={date} title={title} context={context} tags={tags} />

      <CaseStudySection number="01" title="Challenge" headingId="challenge-heading">
        <ProseLead><p>{context}</p></ProseLead>
      </CaseStudySection>

      <CaseStudySection number="02" title="My Role" headingId="role-heading">
        <RoleContent overview={roleOverview} scope={scope} />
      </CaseStudySection>

      <CaseStudySection number="03" title="The System" headingId="system-heading" variant="system">
        <SystemFlow
          nodes={systemNodes}
          caption="Reconstructed from the approved role scope: builder discovery, qualification, program and partner routing, tracking, and performance reporting."
        />
      </CaseStudySection>

      <CaseStudySection number="04" title="Results" headingId="results-heading">
        <OutcomePair metrics={outcomes} />
        <ProgressionFigure
          title="Engagement Progression"
          eyebrow="Aggregate figures"
          metrics={progression}
          caption="Approved engagement totals show the progression from outbound activity to ongoing builder conversations and follow-up."
        />
        <EvidenceGrid items={evidence} />
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
