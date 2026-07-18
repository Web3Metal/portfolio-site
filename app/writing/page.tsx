import type { Metadata } from "next";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "Writing" };
const areas = [
  ["Technology", "Reporting on crypto, Web3, AI, platforms, and the people building around emerging tools.", "CryptoSlate · Web3 Metal"],
  ["Culture & music", "Artist interviews, live-show coverage, metal culture, and the evolving relationship between music and technology.", "Seattle Weekly · MetalShout · Sinner Magazine"],
  ["Civics & politics", "Local reporting, national campaign coverage, public forums, and explanatory work grounded in communities.", "International Examiner · The Mukilteo Beacon · independent media"],
  ["Editorial systems", "Newsletters, scripts, white papers, social narratives, and campaign copy designed to move from information to participation.", "Founder and client work"],
];
export default function WritingPage() { return <><SiteHeader /><main>
  <PageIntro kicker="Writing / Selected areas" title="Reporting, explaining, and finding the human story inside a system." copy="More than eight years of multimedia journalism and editorial work across politics, culture, music, technology, and community." />
  <section className="content-section"><div className="wrap content-grid">{areas.map(([title,copy,source], i) => <article className="content-card" key={title}><div><p className="tag">0{i+1}</p><h3>{title}</h3></div><div><p>{copy}</p><p className="tag">{source}</p></div></article>)}</div></section>
  <ContactBlock />
  </main><SiteFooter /></>;
}
