"use client";

import { useState } from "react";
import VideoPlayer from "../video-player";
import styles from "../../wave-warz.module.css";

export function PerformanceVideo({ slug, title }: { slug: string; title: string }) {
  const [requested, setRequested] = useState(false);
  const poster = `/assets/wave-warz/${slug}-poster.jpg`;
  return <div className={styles.performanceMedia}>
    {requested ? <VideoPlayer controls autoPlay playsInline preload="none" poster={poster} width={1280} height={720} aria-label={title}>
      <source src={`/assets/wave-warz/${slug}.mp4`} type="video/mp4" />
    </VideoPlayer> : <button type="button" className={styles.loadVideo} aria-label={`Play ${title}`} onClick={() => setRequested(true)}>
      {/* Posters are local derivatives; full recordings are not attached until requested. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={`${title} performance-video frame`} width={1280} height={720} loading="lazy" />
      <span>Play video ↗</span>
    </button>}
  </div>;
}
