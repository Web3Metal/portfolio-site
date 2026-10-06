import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { ContactBlock, PageIntro, SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "AI Builder & Community" };

export default function AiBuilderCommunityPage() {
  return <><SiteHeader /><main>
    <PageIntro
      kicker="AI Builder and Community"
      title="AI Builder & Community"
      copy="A proof-of-work page for AI-assisted building, creative technology, audience systems, and the communities that make emerging products useful."
    />
    <section className="content-section" aria-label="Selected artist experiences">
      <div className={`wrap ${styles.artifacts}`}>
        <article className={styles.card} aria-labelledby="last-rehearsal-heading">
          <header>
            <h2 id="last-rehearsal-heading">The Last Rehearsal</h2>
            <p><em>Interactive game prototype · AI-built experience</em></p>
          </header>
          <a className={styles.preview} href="https://replicant-case-01.r3plic4nt.chatgpt.site/" target="_blank" rel="noopener noreferrer" aria-label="Play The Last Rehearsal beta">
            <Image
              src="/assets/last-rehearsal-beta.png"
              alt="The Last Rehearsal beta showing a dark rehearsal-room scene and the co-op case invitation panel"
              width={679}
              height={293}
              sizes="(max-width: 900px) calc(100vw - 84px), (max-width: 1452px) calc((100vw - 208px) / 2), 622px"
              unoptimized
            />
          </a>
          <p>A fast MVP build for a single-player or co-op point-and-click detective game, connecting my music with the game’s world and soundtrack—exploring how an artist’s music can extend into an interactive experience rather than live separately from it. The playable beta is an early prototype; we’re now building the full adventure from scratch.</p>
          <div className={styles.cardFooter}>
            <p><strong>Context:</strong> Winner, Camp AI Show challenge</p>
            <a className="text-link" href="https://replicant-case-01.r3plic4nt.chatgpt.site/" target="_blank" rel="noopener noreferrer">Play the beta <span aria-hidden="true">↗</span></a>
          </div>
        </article>
        <article className={styles.card} aria-labelledby="artist-site-heading">
          <header>
            <h2 id="artist-site-heading">r3plic4nt.com</h2>
            <p><em>Artist website · Creative &amp; Visual Direction</em></p>
          </header>
          <a className={styles.preview} href="https://r3plic4nt.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit r3plic4nt.com">
            <Image
              src="/assets/r3plic4nt-site-preview.jpg"
              alt="r3plic4nt.com homepage with distressed red-and-black imagery, scanline typography, and an industrial visual atmosphere"
              width={1440}
              height={900}
              sizes="(max-width: 900px) calc(100vw - 84px), (max-width: 1452px) calc((100vw - 208px) / 2), 622px"
              unoptimized
            />
          </a>
          <p>Designed as the digital home for r3plic4nt, the site translates music, visual identity, and atmosphere into a cohesive online world. I directed the aesthetic language, page experience, visual references, and evolution of the site—connecting releases, visuals, and interactive experiments such as <em>The Last Rehearsal</em> into one artist-led experience.</p>
          <div className={styles.cardFooter}>
            <a className="text-link" href="https://r3plic4nt.com/" target="_blank" rel="noopener noreferrer">Visit r3plic4nt.com <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      </div>
    </section>
    <div className="wrap"><Link className="text-link" href="/gaming-interactive">Gaming &amp; Interactive work <span>↗</span></Link></div>
    <ContactBlock compact />
  </main><SiteFooter /></>;
}
