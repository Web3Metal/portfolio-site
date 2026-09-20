import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";
import { caseStudies } from "../site-data";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return <><SiteHeader /><main>
    <PageIntro kicker="Case Studies" title="Projects where content, community, and growth had to work together." copy="Selected stories about the systems I built, the work I made, and the outcomes that followed." />
    <section className="case-index" aria-label="Selected case studies"><div className="wrap case-index-grid">
      {caseStudies.map((item) => {
        const href = `/case-studies/${item.slug}`;
        return <article className="case-index-card" id={item.slug} key={item.slug}>
          <div className="case-index-meta"><span>Case study</span><span>{item.role}</span></div>
          {"image" in item && item.image ? <Link className="case-index-image" href={href} aria-label={`View the ${item.title} case study`}><Image src={item.image} alt={`${item.title} work sample`} width={1920} height={1080} unoptimized /></Link> : null}
          <h2><Link href={href}>{item.title}</Link></h2>
          <p className="case-index-summary">{item.summary}</p>
          <div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="case-index-results">{item.results.slice(0, 3).map(result => <span key={result}>{result}</span>)}</div>
          <Link className="case-study-link" href={href}>Read the case study <span aria-hidden="true">↗</span></Link>
        </article>;
      })}
    </div></section>
    <ContactBlock compact />
  </main><SiteFooter /></>;
}
