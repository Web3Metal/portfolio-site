import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";
export const metadata: Metadata = { title: "About" };
export default function AboutPage() { return <><SiteHeader /><main>
  <PageIntro kicker="About / Shawn Porter" title="Strategy is most useful when it can survive contact with the work." copy="I move between strategy and execution: shaping the model, producing the media, hosting the program, engaging the audience, and building the reporting loop." />
  <section className="content-section"><div className="wrap about-grid"><div><h2>Across disciplines, one pattern.</h2></div><div><p>I began in journalism and live media, learning how to find the real story, work in public, and earn attention. That expanded into social strategy, podcast and event production, gaming communities, developer engagement, and creator ecosystems.</p><p>The throughline is not a platform or industry. It is the ability to recognize what an idea needs in order to become a functioning system—and then work across content, community, operations, and product to build it.</p><Link className="text-link" href="/resume">View resume <span>↗</span></Link></div></div></section>
  <ContactBlock compact />
  </main><SiteFooter /></>;
}
