import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Narrative Writing & Worldbuilding",
  description: "Shawn Porter’s narrative writing for interactive worlds: The Last Rehearsal, Case-Zero, and selected Fight Legends writing.",
  openGraph: {
    title: "Shawn Porter — Narrative Writing & Interactive Storytelling",
    description: "Shawn Porter’s narrative writing for interactive worlds: The Last Rehearsal, Case-Zero, and selected Fight Legends writing.",
    url: "https://www.shawnsporter.com/narrative",
    type: "website",
    images: [{ url: "https://www.shawnsporter.com/social-narrative.png", width: 1200, height: 630, alt: "The Last Rehearsal investigative scene — Shawn Porter’s narrative writing and interactive storytelling portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shawn Porter — Narrative Writing & Interactive Storytelling",
    description: "Shawn Porter’s narrative writing for interactive worlds: The Last Rehearsal, Case-Zero, and selected Fight Legends writing.",
    images: ["https://www.shawnsporter.com/social-narrative.png"],
  },
};

const samples = [
  {
    title: "Multiverse Theory", focus: "World premise and social conflict",
    copy: "A setting document that connects resource scarcity, class, interdimensional expansion, the Rift Wars, and the forces shaping its fighters.",
    // Verified against Worldbuilding/multiverse theory.pdf; whitespace normalized only.
    excerpt: "Now, wars are fought with computer code if you are a suit and with blood and bone if you weren't born with a silver spoon in your mouth.",
  },
  {
    title: "Introducing Nix", focus: "Character origin and motivation",
    copy: "A character introduction tracing Nix’s forced experimentation, escape from the Agency, and personal reason for entering the Fight Legends conflict.",
    href: "https://medium.com/@FightLegends/introducing-nix-fight-legends-ab55663dae23",
  },
  {
    title: "Ross Levine", focus: "Real-world character adaptation",
    copy: "A piece that blends a real combat athlete’s background with the future history, stakes, and rules of the Fight Legends universe.",
    href: "https://medium.com/@FightLegends/get-to-know-ross-levine-fight-legends-d07919536892",
  },
  {
    title: "Story Mode", focus: "Narrative progression and player choice",
    copy: "A player-facing explanation of how character context, regional progression, event choices, escalating AI behavior, and rewards were intended to work together.",
    href: "https://medium.com/@FightLegends/story-mode-fight-legends-f4242e234c0d",
  },
];

export default function NarrativePage() {
  return <><SiteHeader /><main className={styles.page}>
    <header className={styles.intro}>
      <p className="eyebrow">SHAWN PORTER / NARRATIVE WRITER &amp; WORLDBUILDER</p>
      <h1>Narrative writing for interactive worlds.</h1>
      <p>I write character, setting, and player-facing story systems for worlds people can investigate, inhabit, and carry with them. My work spans original interactive prototypes and authored game-world writing, with a focus on atmosphere, motivation, player discovery, and the relationship between story and play.</p>
    </header>
    <section className={styles.prototype} aria-labelledby="rehearsal-heading">
      <div><p className={styles.label}>PLAYABLE INTERACTIVE MYSTERY</p><h2 id="rehearsal-heading">The Last Rehearsal</h2>
        <p>A sci-fi detective prototype built around environmental discovery. Players inspect a crime scene, collect evidence from the body, damaged speaker, and terminal, then use a Caseboard to weigh competing theories and pursue the strongest lead.</p>
        <p>I conceived and scripted the full interaction flow, including the scene premise, evidence, use actions, terminal log, theory-selection interface, and completion state. The prototype uses player investigation and inference as the route into its larger mystery.</p>
        <a className={styles.action} href="https://replicant-case-01.r3plic4nt.chatgpt.site/" target="_blank" rel="noopener noreferrer">Play the prototype ↗</a>
      </div>
      <div className={styles.prototypeEvidence}>
        <figure><Image src="/assets/last-rehearsal-investigation-scene.webp" width={1600} height={763} alt="The Last Rehearsal player character in the investigative rehearsal-room scene, with the body, terminal, and Look and Use controls" sizes="(max-width: 800px) calc(100vw - 36px), 48vw" unoptimized priority /></figure>
        <figure className={styles.caseboard}>
          <a href="/assets/last-rehearsal-caseboard.webp" target="_blank" rel="noopener noreferrer" aria-label="View the Caseboard screenshot at full size"><Image src="/assets/last-rehearsal-caseboard.webp" width={727} height={776} alt="Completed Caseboard with collected evidence, three working theories, and the result of tracing the V-17 maintenance chip" sizes="(max-width: 800px) 42vw, 220px" unoptimized /></a>
          <figcaption>Caseboard · Evidence, theory selection, and decision result.<span>Open screenshot ↗</span></figcaption>
        </figure>
      </div>
    </section>
    <h2 className={styles.transition}>From a compact mystery to a deeper original world</h2>
    <section className={styles.world} aria-labelledby="case-zero-heading">
      <div><p className={styles.label}>IN DEVELOPMENT / POINT AND CLICK NARRATIVE</p><h2 id="case-zero-heading">Case-Zero</h2>
        <p className={styles.factual}>Story concept · Worldbuilding · Three gray-box scenes · Early puzzle design · Music integration</p>
      </div>
      <div><p>Case-Zero is an in-development sci-fi point-and-click investigation into creativity, authorship, and the power to decide whose expression counts. When human intention and artificial intelligence shape the same work, where does the musician end and the tool begin? What happens when that distinction carries consequences for someone’s freedom?</p>
        <p>A planned r3plic4nt album functions both as the game’s soundtrack and as music within its world. Players encounter the songs as atmosphere and expression before investigating their origins, bringing their own emotional response into a story about artistic legitimacy, identity, and control.</p>
        <p className={styles.process}>After building The Last Rehearsal, I began Case-Zero in Adventure Game Studio to develop a deeper original adventure world. I built the first three gray-box scenes and a simple puzzle, then paused expansion to establish the story foundation before committing further locations and interactions.</p>
      </div>
      <div className={styles.grayboxSequence} aria-label="Case-Zero gray-box development scenes">
        {[[1201, 747], [1201, 750], [1197, 747]].map(([width, height], index) => <figure key={index}>
          <Image src={`/assets/case-zero-scene-0${index + 1}.webp`} width={width} height={height} alt={`Case-Zero gray-box development screenshot, scene ${index + 1}`} sizes="(max-width: 800px) calc(100vw - 36px), 33vw" unoptimized />
          <figcaption>Scene 0{index + 1} · Gray-box development</figcaption>
        </figure>)}
      </div>
    </section>
    <section className={styles.writing} aria-labelledby="writing-heading">
      <div className={styles.writingHeader}>
        <div><h2 id="writing-heading">Fight Legends: Selected Narrative Writing</h2>
          <p className={styles.writingIntro}>Authored and conceptualized for Fight Legends, these pieces connect world premise, character motivation, player progression, and the systems surrounding a developing fighting game.</p>
        </div>
        <figure className={styles.nixEvidence}><Image src="/assets/fight-legends/nix-article-artwork.png" width={1100} height={619} alt="Fight Legends project artwork showing Nix’s character design and cybernetic limbs from three angles" sizes="(max-width: 800px) calc(100vw - 36px), 340px" unoptimized /><figcaption>Nix · Project artwork accompanying Shawn’s character writing.</figcaption></figure>
      </div>
      <div className={styles.samples}>{samples.map(sample => <article key={sample.title}>
        <h3>{sample.title}</h3><p className={styles.focus}>{sample.focus}</p><p>{sample.copy}</p>
        {sample.excerpt && <blockquote><p>“{sample.excerpt}”</p><cite>Multiverse Theory · Excerpt</cite></blockquote>}
        {sample.href && <a className={styles.action} href={sample.href} target="_blank" rel="noopener noreferrer">Read on Medium ↗</a>}
      </article>)}</div>
    </section>
    <section className={styles.closing}><h2>Let’s build worlds with something to say.</h2><Link className={styles.action} href="/contact">Get in touch →</Link></section>
  </main><SiteFooter /></>;
}
