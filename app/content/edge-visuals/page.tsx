import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../site-components';
import shared from '../../wave-warz.module.css';
import styles from './page.module.css';
import { artBasel, interviewPresentation, packaging, socialRollout } from './data';
import { GuestReel } from './guest-reel';

export const metadata: Metadata = {
  title: 'Edge of NFT · Episode visuals & packaging',
  description: 'A selection of episode artwork, show-presentation layouts, and social-video packaging.',
};
type Still = { title: string; src: string; width: number; height: number };
function StillImage({ item, priority = false }: { item: Still; priority?: boolean }) {
  return <a className={styles.imageLink} href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`View larger: ${item.title}`}>
    <Image src={item.src} alt={item.title} width={item.width} height={item.height} unoptimized priority={priority} sizes="(max-width: 620px) calc(100vw - 36px), 45vw" />
  </a>;
}
export default function EdgeVisualCollection() {
  return <><SiteHeader /><main className={shared.collection}><div className={shared.wrap}>
    <Link className={shared.back} href="/content">← Gallery</Link>
    <header className={shared.intro}><h1>Edge of NFT · Episode visuals &amp; packaging</h1><p>A selection of episode artwork, show-presentation layouts, and social-video packaging.</p></header>
    <section className={styles.group} aria-labelledby="art-basel"><h2 id="art-basel">Art Basel field-interview series</h2><p className={styles.credit}>Thumbnail concept &amp; design</p>
      <div className={styles.triptych}>{artBasel.map((item, index) => <figure key={item.title}><StillImage item={item} priority={index === 0} /><figcaption>{item.title}</figcaption></figure>)}</div>
    </section>
    <section className={styles.group} aria-labelledby="interview-presentation"><h2 id="interview-presentation">Interview presentation → social adaptation</h2><p className={styles.credit}>Overlay design, live recording &amp; short-form adaptation</p>
      <div className={styles.presentation}>
        <figure><StillImage item={interviewPresentation[0]} /><figcaption>{interviewPresentation[0].title} · Video-work screenshot</figcaption></figure>
        <figure className={styles.reel}><GuestReel /><figcaption><strong>All Guest Intro Reel</strong><br />Show overlay design</figcaption></figure>
        <figure className={styles.portrait}><StillImage item={interviewPresentation[1]} /><figcaption>{interviewPresentation[1].title} · Video-work screenshot</figcaption></figure>
      </div>
    </section>
    <div className={`${styles.group} ${styles.triptych}`}>{packaging.map(item => <section key={item.title}><StillImage item={item} /><h2>{item.title}</h2><p className={styles.credit}>Episode / launch artwork · Thumbnail concept &amp; design</p></section>)}</div>
    <section className={`${styles.group} ${styles.social}`} aria-labelledby="social-rollout"><h2 id="social-rollout">Social rollout</h2><p className={styles.credit}>Published-post screenshots · Copywriting &amp; visual overlay design</p>
      <div className={styles.socialPair}>{socialRollout.map(item => <figure key={item.title}><StillImage item={item} /><figcaption>{item.title}</figcaption></figure>)}</div>
    </section>
  </div></main><SiteFooter /></>;
}
