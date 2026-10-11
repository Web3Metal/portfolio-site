"use client";

import { useState } from "react";
import VideoPlayer from "../video-player";
import styles from "./page.module.css";

export function ArtifactVideo({ title, src, poster, width, height }: { title: string; src: string; poster: string; width: number; height: number }) {
  const [requested, setRequested] = useState(false);
  return <div className={styles.media} style={{ aspectRatio: `${width} / ${height}` }}>
    {requested ? <VideoPlayer controls autoPlay playsInline preload="none" poster={poster} width={width} height={height} aria-label={title}>
      <source src={src} type="video/mp4" />
    </VideoPlayer> : <button type="button" className={styles.loadVideo} aria-label={`Play ${title}`} onClick={() => setRequested(true)}>
      {/* Full video sources are attached only after a visitor requests playback. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={`${title} video preview`} width={width} height={height} loading="lazy" />
      <span>Play video ↗</span>
    </button>}
  </div>;
}
