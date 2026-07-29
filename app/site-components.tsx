import Link from "next/link";
import { caseStudies, navItems } from "./site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Shawn Porter home"><span>SP</span><small>Shawn Porter</small></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap"><p>Shawn Porter</p><p>Seattle, WA · Growth / Community / Media / Creative Technology</p><p><Link href="/writing">Writing ↗</Link></p><p>© {new Date().getFullYear()}</p></div></footer>;
}

export function PageIntro({ kicker, title, copy }: { kicker: string; title: string; copy: string }) {
  return <section className="page-intro wrap"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p className="lede">{copy}</p></section>;
}

export function CaseStudyList({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? "case-list compact" : "case-list"}>{caseStudies.map((item) => (
    <Link className="case-row" href={`/case-studies#${item.slug}`} key={item.slug}>
      <span className="case-number">{item.number}</span><span><strong>{item.title}</strong><small>{item.role}</small></span><p>{item.summary}</p><span className="case-arrow" aria-hidden="true">↗</span>
    </Link>
  ))}</div>;
}

export function ContactBlock() {
  return <section className="contact-block" id="contact"><div className="wrap"><p className="eyebrow">Have an idea with a missing system?</p><h2>Let’s make it work.</h2><a className="contact-link" href="mailto:shawnport84@gmail.com">shawnport84@gmail.com <span>↗</span></a></div></section>;
}
