import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "Resume" };

type ResumeEntry = {
  organization: string;
  role: string;
  dates: string;
  employmentType?: string;
  bullets: string[];
};

const professionalExperience: ResumeEntry[] = [
  {
    organization: "Ava Labs",
    role: "Developer Engagement Manager",
    dates: "Oct 2024 – Oct 2025",
    bullets: [
      "Managed developer engagement through Sprinklr, identifying and nurturing promising builders, segmenting audiences, improving onboarding, and routing qualified leads to Avalanche programs and deeper technical support.",
      "Engaged 9,000+ developers and drove 6,900+ visits to Avalanche programs, resources, and events.",
      "Managed 4,400+ initial interactions, 3,500+ continued conversations, and 600+ follow-ups.",
      "Helped double program conversions from Q1 to Q2, contributed to a 29% improvement in clicks per message, and supported a 229% month-over-month increase in Elevate conversions.",
      "Ranked among the team’s strongest performers for click-through rate and lead discovery.",
    ],
  },
  {
    organization: "Edge of Company",
    role: "Web3 Social Media Manager & Podcast Producer",
    dates: "Jan 2022 – Dec 2022",
    bullets: [
      "Managed the production and distribution workflow for interview programming, including branded recordings, quality control, editing, social clips, supporting assets, and publishing across podcast and video platforms.",
      "Generated 24,300 additional profile visits, grew followers by 35%, added 4,000+ followers in 30 days, and increased impressions by 28% in 30 days.",
      "Added 193 YouTube subscribers, generated 17,800 additional YouTube views, and added 49.4 hours of YouTube watch time.",
    ],
  },
  {
    organization: "Fight Legends",
    role: "Web3 Gaming Community Lead",
    dates: "Jan 2021 – Dec 2021",
    bullets: [
      "Created and ran a recurring development show that turned weekly product progress into a steady stream of community-facing content.",
      "Owned the show concept, format, visual direction, editing, and social distribution while supporting Discord events, AMAs, contests, and paid promotion.",
      "Increased YouTube subscribers by 25% and social engagement by approximately 30%.",
      "Produced roughly 25–35 development-show episodes and an estimated 75–140 short-form clips across the year.",
    ],
  },
  {
    organization: "Cointelegraph Media",
    role: "Social Media & Content Manager",
    dates: "2020",
    bullets: [
      "Managed social content for approximately 2–3 blockchain clients, translating technical products and campaign goals into clear copy, visual briefs, publishing plans, and platform-specific posts.",
      "Coordinated with designers, scheduled and published content, and used performance data to refine future work.",
      "Maintained distinct client voices while applying a repeatable workflow across copy, design coordination, publishing, and optimization.",
    ],
  },
];

const founderLedProjects: ResumeEntry[] = [
  {
    organization: "Web3 Metal",
    role: "Founder",
    dates: "Oct 2023 – Present",
    bullets: [
      "Founded Web3 Metal and continue to lead its growth as a creator ecosystem spanning editorial coverage, Discord programming, competitions, collaborations, creator support, and product experiments.",
      "Built a community of 192 Discord members and published 27 newsletter issues.",
      "Maintained a 37.59% newsletter open rate and achieved a 20% click-to-open rate.",
      "Helped launch Cyber Metal Radio as a separate community-led project.",
    ],
  },
  {
    organization: "Cyber Metal Radio",
    role: "Co-Founder and Growth Lead",
    dates: "Oct 2023 – Present",
    bullets: [
      "Led zero-to-one marketing and growth, recruiting artists and building recurring submission, ranking, live-programming, and recognition systems.",
      "Generated 1,765 artist submissions, 200,000+ listens, and 16,000+ community interactions in 2025.",
      "Established New Metal Monday, the weekly Top 15 countdown, and an annual awards program as recurring reasons for creators to submit, listen, share, and return.",
    ],
  },
];

const earlierExperience: ResumeEntry[] = [
  {
    organization: "Freelance",
    role: "Multimedia Journalist",
    employmentType: "Freelance & Contract",
    dates: "Aug 2015 – Oct 2023",
    bullets: [
      "Reported and produced multimedia work across politics, culture, music, technology, civic forums, and live events.",
      "Work included reporting, editing, livestream production, music coverage, and independent media.",
    ],
  },
];

const recognition = [
  "Winner, Summer of Suno I",
  "Winner, Summer of Suno II",
  "Winner, Wave Warz 44",
  "Best Song 2025, Cyber Metal Radio",
  "Best Doom Song 2025, Cyber Metal Radio",
];

function ResumeEntries({ entries }: { entries: ResumeEntry[] }) {
  return (
    <div className="resume-list">
      {entries.map((entry) => (
        <article className="resume-row" key={`${entry.organization}-${entry.role}`}>
          <div>
            <h3>{entry.organization}</h3>
            <p className="tag">{entry.dates}</p>
          </div>
          <div>
            <strong>{entry.role}</strong>
            {entry.employmentType && <p>{entry.employmentType}</p>}
            <ul>
              {entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageIntro
          kicker="Resume / Experience"
          title="Growth, community, media, and creative technology."
          copy="Growth, community, and content strategist who finds the missing system behind an idea, then builds the content, community, or product that makes it work. Experience spans developer engagement, creator ecosystems, audience growth, editorial operations, video and podcast production, and emerging technology. Combines strategy with hands-on execution across onboarding, programming, analytics, publishing, and cross-functional delivery."
        />
        <section className="content-section"><div className="wrap">
          <p className="eyebrow">Contact / Download</p>
          <p>Seattle, WA · <a href="mailto:shawnport84@gmail.com">shawnport84@gmail.com</a><br /><a href="https://linkedin.com/in/shawnsporter">LinkedIn ↗</a> · <a href="https://authory.com/Shawnsporter">Writing ↗</a> · <a href="https://hyperfollow.com/r3plic4nt">Creator portfolio ↗</a></p>
          <a className="button" href="/Shawn-Porter-Resume.pdf" download>Download PDF resume ↓</a>
        </div></section>
        <section className="content-section"><div className="wrap">
          <p className="eyebrow">Core Skills</p>
          <p className="lede">Developer Engagement · Community Growth · Creator Ecosystems · Content Strategy · Growth Operations · Audience Development · Podcast and Video Production · Analytics and Reporting</p>
        </div></section>
        <section className="content-section"><div className="wrap"><p className="eyebrow">Professional Experience</p><ResumeEntries entries={professionalExperience} /></div></section>
        <section className="content-section"><div className="wrap"><p className="eyebrow">Founder-Led Projects</p><ResumeEntries entries={founderLedProjects} /></div></section>
        <section className="content-section"><div className="wrap"><p className="eyebrow">Earlier Experience</p><ResumeEntries entries={earlierExperience} /></div></section>
        <section className="content-section"><div className="wrap about-grid">
          <div><p className="eyebrow">Education</p><h2>University of Washington</h2><p>Bachelor of Arts — Journalism & Political Science</p></div>
          <div><p className="eyebrow">Selected Recognition</p><ul>{recognition.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div></section>
      </main>
      <SiteFooter />
    </>
  );
}
