import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gaming & Interactive",
  description: "Shawn Porter’s selected work in game-development storytelling, narrative writing, interactive experiences, and creative direction.",
};

const projects = [
  {
    id: "fight-legends", title: "Fight Legends",
    format: "Game-development storytelling · Narrative writing · Show production",
    image: "/assets/fight-legends/dev-update-22-poster.png", width: 1280, height: 720,
    alt: "Fight Legends development show episode 22 with Shawn and a second presenter",
    caption: "Development show · Episode 22 · Two presenters",
    summary: "Helping make a game in development understandable and worth following through lore, recurring development shows, and community participation.",
    label: "My contribution",
    contribution: "Developed and wrote narrative material from artist-created character concepts, team brainstorming, or from scratch. Owned the show concept, format, visual direction, editing, and social distribution.",
    links: [{ label: "Explore the case study", href: "/case-studies/fight-legends" }, { label: "Read character lore", href: "/content/fight-legends/introducing-nix" }],
  },
  {
    id: "last-rehearsal", title: "The Last Rehearsal",
    format: "Interactive game prototype · AI-built experience",
    image: "/assets/last-rehearsal-beta.png", width: 679, height: 293,
    alt: "The Last Rehearsal rehearsal-room scene and co-op case invitation interface",
    caption: "Playable MVP · Early beta",
    summary: "A fast MVP build for a single-player or co-op point-and-click detective game, connecting my music with the game’s world and soundtrack.",
    label: "In development",
    contribution: "The playable beta is an early prototype; we’re now building the full adventure from scratch.",
    links: [{ label: "Play the beta", href: "https://replicant-case-01.r3plic4nt.chatgpt.site/" }, { label: "View project context", href: "/ai-builder-community#last-rehearsal-heading" }],
  },
  {
    id: "artist-site", title: "r3plic4nt.com",
    format: "Artist platform · Creative & Visual Direction",
    image: "/assets/r3plic4nt-site-preview.jpg", width: 1440, height: 900,
    alt: "r3plic4nt.com’s industrial red-and-black visual world and scanline typography",
    caption: "Artist platform · Website preview",
    summary: "Translating music, visual identity, and atmosphere into a cohesive digital world.",
    label: "My contribution",
    contribution: "Directed the aesthetic language, page experience, visual references, and evolution of the site—connecting releases, visuals, and interactive experiments into one artist-led experience.",
    links: [{ label: "Visit r3plic4nt.com", href: "https://r3plic4nt.com/" }, { label: "View project context", href: "/ai-builder-community#artist-site-heading" }],
  },
];

export default function GamingInteractivePage() {
  return <><SiteHeader /><main className={`wrap ${styles.page}`}>
    <header className={styles.intro}>
      <p className="eyebrow">Selected work / Gaming &amp; Interactive</p>
      <h1>Gaming &amp; Interactive</h1>
      <p className={styles.promise}>Selected work in game-development storytelling, narrative writing, interactive experiences, and creative direction—from making an unfinished game worth following to building an artist-led digital world.</p>
      <p>I’m a content strategist and creative producer, bringing growth, community, and systems experience to how the work reaches and engages people.</p>
    </header>
    <section aria-label="Featured gaming and interactive work" className={styles.projects}>
      {projects.map((project, index) => <article key={project.id} className={styles.project} aria-labelledby={`${project.id}-heading`}>
        <figure><Image src={project.image} alt={project.alt} width={project.width} height={project.height} unoptimized priority={index === 0} sizes="(max-width: 800px) calc(100vw - 36px), 42vw" /><figcaption>{project.caption}</figcaption></figure>
        <div><p className={styles.format}>{project.format}</p><h2 id={`${project.id}-heading`}>{project.title}</h2>
          <p>{project.summary}</p>
          <p className={styles.credit}><strong>{project.label}:</strong> {project.contribution}</p>
          <div className={styles.links}>{project.links.map(link => link.href.startsWith("/")
            ? <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>
            : <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>
        </div>
      </article>)}
    </section>
    <div className={styles.closing}><Link href="/resume">View résumé <span aria-hidden="true">→</span></Link><Link href="/#selected-content">Explore Content Creation <span aria-hidden="true">→</span></Link></div>
  </main><SiteFooter /></>;
}
