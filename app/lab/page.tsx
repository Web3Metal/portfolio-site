import type { Metadata } from "next";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "Lab" };

const experiments = [
  ["Early concept", "AI Band Simulator", "A narrative rhythm game built around music creation, where players write songs with AI bandmates, get signed, perform live, and shape the story through the music they create."],
  ["Early concept", "Explorable Album Universe", "An interactive world built around an artist’s music, where individual songs become locations, characters, stories, and playable experiences."],
  ["Experiment", "Text-to-MIDI Workbench", "An experiment in translating language, narrative structure, and emotional tone into editable MIDI patterns for further composition inside a DAW."],
  ["Early concept", "Live AI Performance Systems", "Tools and performance concepts that allow artists to control, reshape, or collaborate with generative music systems during a live show rather than simply playing finished AI tracks."],
];

const explorationAreas = [
  "AI-assisted music composition",
  "Interactive albums and narrative games",
  "Creator tools and artist-facing platforms",
  "Live performance interfaces",
  "Procedural storytelling and worldbuilding",
  "New ways for audiences to participate in creative work",
];

export default function LabPage() { return <><SiteHeader /><main>
  <PageIntro kicker="Lab / Experiments and early concepts" title="The Creative Lab is where I test ideas that do not fit neatly into a case study." copy="AI music systems, interactive worlds, performance tools, narrative experiments, and early product concepts." />
  <section className="content-section"><div className="wrap">
    <p className="lede" style={{ maxWidth: 900, marginBottom: "clamp(48px, 7vw, 90px)" }}>These are experiments and early concepts, not a list of launched products.</p>
    <div className="content-grid">{experiments.map(([status,title,copy], index) => <article className="content-card" key={title}><div><p className="tag">0{index+1} / {status}</p><h3>{title}</h3></div><p>{copy}</p></article>)}</div>
  </div></section>
  <section className="content-section"><div className="wrap case-columns">
    <div><h2>What I’m Exploring</h2><ul>{explorationAreas.map((area) => <li key={area}>{area}</li>)}</ul></div>
    <div><h2>The Working Method</h2><p>Each project starts with a question, becomes a rough system, and gets tested through prototypes, creative use, and real feedback. The useful ideas move forward.</p></div>
  </div></section>
  <ContactBlock />
  </main><SiteFooter /></>;
}
