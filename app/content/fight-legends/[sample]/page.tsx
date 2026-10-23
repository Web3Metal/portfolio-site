import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../site-components";
import { fightLegendsSamples } from "../samples";
import styles from "../sample.module.css";

type Props = { params: Promise<{ sample: string }> };
export function generateStaticParams() {
  return fightLegendsSamples.map(({ slug }) => ({ sample: slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sample: slug } = await params;
  const sample = fightLegendsSamples.find((item) => item.slug === slug);
  return { title: sample?.title ?? "Writing sample", description: sample ? ("credit" in sample ? `${sample.format} by Shawn Porter for Fight Legends. Full locally preserved document.` : `${sample.format} by Shawn Porter, originally published for Fight Legends. Locally preserved writing sample.`) : "Archived Fight Legends writing sample." };
}
export default async function WritingSamplePage({ params }: Props) {
  const { sample: slug } = await params;
  const sample = fightLegendsSamples.find((item) => item.slug === slug);
  if (!sample) notFound();
  return <>
    <SiteHeader />
    <main className={styles.page}>
      <header>
        <Link className={styles.back} href="/content/fight-legends">← Back to Fight Legends visual collection</Link>
        <p className={styles.kicker}>Writing sample · {sample.format}</p>
        <h1>{sample.title}</h1>
        <p className={styles.credit}>{"credit" in sample ? sample.credit : "Written by Shawn Porter · Originally published for Fight Legends"} · {sample.published}</p>
        <aside className={styles.context} aria-label="Archive context">
          <p>Historical writing sample from a game in development. Planned features and promotional statements are preserved as originally written, not presented as current offerings or verified shipped features.</p>
          <p>{"contribution" in sample ? sample.contribution : "My contribution: concept and writing. Character concepts and artwork were created by the game’s artists, with team input and brainstorming informing the narrative."}</p>
        </aside>
      </header>
      <article aria-label="Archived article" className={styles.article}>
        {"image" in sample && <figure>
          <Image src={sample.image} alt={sample.alt} width={"imageWidth" in sample ? sample.imageWidth : 1100} height={"imageHeight" in sample ? sample.imageHeight : 619} sizes="(max-width: 800px) calc(100vw - 36px), 760px" unoptimized priority />
          <figcaption>{sample.slug === "litepaper" ? "Original project artwork · Fight Legends artists/team. Shown as context for the document, not as my illustration work." : "Original article artwork · Fight Legends artists/team. Shown as context for the writing, not as my illustration work."}</figcaption>
        </figure>}
        {sample.blocks.map((block, index) => {
          if ("heading" in block) return <h2 key={index}>{block.heading}</h2>;
          if ("subheading" in block) return <h3 key={index}>{block.subheading}</h3>;
          if ("list" in block) return <ul key={index}>{block.list.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>;
          if ("table" in block) return <div key={index} className={styles.tableScroll} role="region" aria-label={`Source table ${index + 1}`} tabIndex={0}>
            <table><thead><tr>{block.table.headers.map((cell, cellIndex) => <th key={cellIndex} scope="col">{cell}</th>)}</tr></thead>
              <tbody>{block.table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>;
          return <p key={index}>{block.text}</p>;
        })}
      </article>
      <footer className={styles.archiveNote}>
        <h2>Archive note</h2>
        <p>{sample.archiveNote}</p>
        <Link className={styles.back} href="/content/fight-legends">← Back to Fight Legends visual collection</Link>
      </footer>
    </main>
    <SiteFooter />
  </>;
}
