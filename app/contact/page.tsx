import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-components";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() { return <><SiteHeader /><main><section className="contact-block" style={{minHeight:"calc(100vh - 76px)", display:"grid", alignItems:"center"}}><div className="wrap"><p className="eyebrow">Contact / Seattle, WA</p><h2>Let’s make it work.</h2><p className="lede" style={{color:"inherit",maxWidth:760,marginBottom:50}}>For growth, community, creator-ecosystem, media, and creative-technology roles—or an idea that needs its operating system.</p><a className="contact-link" href="mailto:shawnport84@gmail.com">shawnport84@gmail.com <span>↗</span></a><a className="contact-link" href="https://www.linkedin.com/in/shawnsporter">LinkedIn <span>↗</span></a></div></section></main><SiteFooter /></>;
}
