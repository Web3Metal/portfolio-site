import type { Metadata } from "next";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "AI Builder & Community" };

export default function AiBuilderCommunityPage() {
  return <><SiteHeader /><main>
    <PageIntro
      kicker="AI Builder and Community"
      title="AI Builder & Community"
      copy="A proof-of-work page for AI-assisted building, creative technology, audience systems, and the communities that make emerging products useful."
    />
    <section className="content-section">
      <div className="wrap">
        <p className="lede" style={{ maxWidth: 760 }}>This page is taking shape. It will bring together the products, prototypes, workflows, and community programs that show how I turn emerging tools into experiences people can understand and use.</p>
      </div>
    </section>
    <ContactBlock compact />
  </main><SiteFooter /></>;
}