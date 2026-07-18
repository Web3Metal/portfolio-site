import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../site-components";
export const metadata: Metadata = { title: "Resume" };
const roles = [
  ["Ava Labs", "Developer Engagement Manager", "2024–2025", "Developer outreach, engagement funnels, program routing, analytics, and performance reporting."],
  ["Web3 Metal / Cyber Metal Radio", "Founder & Growth Lead", "2023–Present", "Creator ecosystem strategy, recurring programming, community growth, partnerships, and live media."],
  ["Edge of Company", "Social Media Manager & Podcast Producer", "2022", "Podcast production, audience growth, live programming, YouTube, and event support."],
  ["Fight Legends", "Community Lead", "2021–2022", "Developer media, gaming-community programs, editorial content, and campaign production."],
  ["Cointelegraph Media", "Social Media & Content Manager", "2020–2021", "Multi-client content strategy and audience development for emerging-technology teams."],
  ["Freelance", "Multimedia Journalist & Livestream Producer", "2015–2023", "Reporting, editing, livestream production, civic forums, music coverage, and independent media."],
];
export default function ResumePage() { return <><SiteHeader /><main>
  <PageIntro kicker="Resume / Experience" title="Growth, community, media, and creative technology." copy="A strategy-and-execution career built across developer ecosystems, creator programs, emerging technology, journalism, and live production." />
  <section className="content-section"><div className="wrap"><a className="button" href="/Shawn-Porter-Resume.pdf" download>Download PDF resume ↓</a><div className="resume-list" style={{marginTop:48}}>{roles.map(([company,role,date,copy]) => <article className="resume-row" key={company}><div><h3>{company}</h3><p className="tag">{date}</p></div><div><strong>{role}</strong><p>{copy}</p></div></article>)}</div></div></section>
  </main><SiteFooter /></>;
}
