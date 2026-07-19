import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";
import { caseStudies } from "../site-data";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return <><SiteHeader /><main>
    <PageIntro kicker="Case Studies / 01–06" title="Systems built to make ideas participate." copy="Selected work across developer growth, creator ecosystems, community programs, media operations, and emerging technology." />
    {caseStudies.map((item) => <article className="case-detail" id={item.slug} key={item.slug}><div className="wrap">
      <div className="case-kicker"><span>{item.number} / Case Study</span><span>{item.role}</span></div>
      {item.slug === "cointelegraph" ? (
        <h2><Link href="/case-studies/cointelegraph">{item.title}</Link></h2>
      ) : <h2>{item.title}</h2>}<p className="case-summary">{item.summary}</p>
      <div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      {"image" in item && item.image ? ["edge-of-company", "web3-metal"].includes(item.slug) ? (
        <Link href={`/case-studies/${item.slug}`} aria-label={`View the ${item.title} case study`}>
          <Image className="case-image" src={item.image} alt={`${item.title} work sample`} width={1920} height={1080} unoptimized />
        </Link>
      ) : <Image className="case-image" src={item.image} alt={`${item.title} work sample`} width={1920} height={1080} unoptimized /> : null}
      <div className="case-columns"><div><h3>The gap</h3><p>{item.challenge}</p></div><div><h3>The system</h3><ul>{item.system.map(point => <li key={point}>{point}</li>)}</ul></div></div>
      <div className="result-grid">{item.results.map(result => <div key={result}>{result}</div>)}</div>
    </div></article>)}
    <ContactBlock />
  </main><SiteFooter /></>;
}
