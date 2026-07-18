import type { Metadata } from "next";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "Lab" };

const experiments = [
  ["Broadcast system", "Cyber Metal Radio", "Weekly programming, creator submissions, live production, rankings, and community rituals assembled into one working media system."],
  ["Creator experiment", "AI music workflows", "Prompt design, rapid song prototyping, collaborative challenges, and public release experiments that connect tools to creative practice."],
  ["Community product", "Competition tools", "Early concepts for submission forms, ranking flows, and lightweight creator tools designed around real community behavior."],
  ["Live production", "Broadcast infrastructure", "OBS scenes, overlays, multi-source production, and repeatable show operations built for teams and community hosts."],
];

export default function LabPage() { return <><SiteHeader /><main>
  <PageIntro kicker="Lab / Ongoing" title="A place for the work that does not fit neatly in one discipline." copy="Experiments in music, broadcast, community formats, creative tools, and the systems connecting them." />
  <section className="content-section"><div className="wrap content-grid">{experiments.map(([tag,title,copy], index) => <article className="content-card" key={title}><div><p className="tag">0{index+1} / {tag}</p><h3>{title}</h3></div><p>{copy}</p></article>)}</div></section>
  <ContactBlock />
  </main><SiteFooter /></>;
}
