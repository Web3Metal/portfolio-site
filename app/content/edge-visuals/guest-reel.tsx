"use client";

import { useState } from 'react';
import VideoPlayer from '../video-player';
import { guestReel } from './data';
import styles from './page.module.css';

export function GuestReel() {
  const [requested, setRequested] = useState(false);
  return <div className={styles.reelMedia}>
    {requested ? <VideoPlayer controls autoPlay playsInline preload="none" poster={guestReel.poster} width={guestReel.width} height={guestReel.height} aria-label={guestReel.title}>
      <source src={guestReel.src} type="video/mp4" />
    </VideoPlayer> : <button className={styles.play} type="button" aria-label={`Play ${guestReel.title}`} onClick={() => setRequested(true)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={guestReel.poster} width={guestReel.width} height={guestReel.height} alt="Edge guest highlight reel showing recurring show overlays" loading="lazy" />
      <span>Play reel ↗</span>
    </button>}
  </div>;
}
