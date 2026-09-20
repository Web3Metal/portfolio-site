import type { Metadata } from "next";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "Writing" };
const sections = [
  {
    title: "Reporting and Essays",
    copy: "Selected journalism, analysis, and commentary on technology, culture, politics, music, and the systems shaping how people create and organize online.",
  },
  {
    title: "Interviews",
    copy: "Conversations with artists, builders, founders, and other people working at the edges of emerging culture and technology.",
  },
  {
    title: "Creative Writing",
    copy: "Selected poetry, lyrics, fiction, and narrative experiments connected to music, worldbuilding, and interactive projects.",
    note: "This section is intentionally selective rather than a complete archive of everything I have written.",
  },
  {
    title: "Archive",
    copy: "Additional published work and older reporting can be found through the full writing archive.",
    href: "https://authory.com/Shawnsporter",
  },
];

export default function WritingPage() {
  return <><SiteHeader /><main>
    <PageIntro
      kicker="Writing / Selected work"
      title="Reporting, essays, interviews, and creative work."
      copy="Shaped by a journalism background and a habit of looking for the overlooked angle."
    />
    <section className="content-section">
      <div className="wrap">
        <p className="lede" style={{ maxWidth: 900, marginBottom: "clamp(48px, 7vw, 90px)" }}>The subjects vary—technology, culture, politics, music, online communities, and emerging creative tools—but the goal stays the same: understand what is actually happening beneath the surface and explain why it matters.</p>
        <div className="content-grid">
          {sections.map((section) => <article className="content-card" key={section.title}>
            <div><h3>{section.title}</h3></div>
            <div>
              <p>{section.copy}</p>
              {section.note ? <p>{section.note}</p> : null}
              {section.href ? <a className="text-link" href={section.href} target="_blank" rel="noreferrer">View Writing Archive <span aria-hidden="true">↗</span></a> : null}
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <ContactBlock compact />
  </main><SiteFooter /></>;
}
