"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./wave-warz.module.css";
import galleryStyles from "./portfolio.module.css";

export function WaveWarzPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [sound, setSound] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMotionAllowed(!preference.matches);
      if (preference.matches) {
        videoRef.current?.pause();
        setSound(false);
      }
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motionAllowed || paused) {
      video?.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.15 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [motionAllowed, paused]);

  return <article className={`${galleryStyles.galleryCard} ${galleryStyles.galleryWide}`}>
    <div className={styles.preview}>
      <Link className={styles.previewLink} href="/content/wave-warz" aria-label="Wave Warz · Featured battle performance visuals — View collection">
        <video ref={videoRef} loop muted={!sound} playsInline preload="none" poster="/assets/wave-warz/featured-battles-poster.jpg" width={960} height={540} aria-hidden="true">
          {motionAllowed && <source src="/assets/wave-warz/featured-battles-trailer.mp4" type="video/mp4" />}
        </video>
        <div className={styles.overlay}><span>WAVE WARZ · LIVESTREAM MUSIC BATTLES</span><p>Visual performance system for five featured battles</p></div>
      </Link>
      {motionAllowed && <div className={styles.controls}>
        <button type="button" aria-label={sound ? "Turn sound off" : "Turn sound on"} onClick={() => {
          const next = !sound;
          setSound(next);
          if (videoRef.current) videoRef.current.muted = !next;
        }}>{sound ? "Sound off" : "Sound on"}</button>
        <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume Wave Warz preview" : "Pause Wave Warz preview"}>{paused ? "Resume" : "Pause"}</button>
      </div>}
    </div>
    <Link className={galleryStyles.galleryCaption} href="/content/wave-warz"><h3>Wave Warz · Featured battle performance visuals</h3><span>View collection ↗</span></Link>
  </article>;
}
