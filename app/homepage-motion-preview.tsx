"use client";

import { useEffect, useRef, useState } from "react";
import gallery from "./portfolio.module.css";
import styles from "./homepage-gallery.module.css";

type MotionItem = { title: string; descriptor: string; video: string; image: string; width: number; height: number; href: string; action: string };

export function HomepageMotionPreview({ item }: { item: MotionItem }) {
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

  return <article className={gallery.galleryCard}>
    <div className={styles.preview}>
      <a className={styles.previewLink} href={item.href} aria-label={`${item.title} — ${item.action}`}>
        <video ref={videoRef} autoPlay={motionAllowed && !paused} loop muted={!sound} playsInline preload="none" poster={item.image} width={item.width} height={item.height} aria-hidden="true">
          {motionAllowed && <source src={item.video} type="video/mp4" />}
        </video>
      </a>
      {motionAllowed && <div className={styles.controls}>
        <button type="button" aria-label={sound ? "Turn sound off" : "Turn sound on"} onClick={() => {
          const next = !sound;
          setSound(next);
          if (videoRef.current) videoRef.current.muted = !next;
        }}>{sound ? "Sound off" : "Sound on"}</button>
        <button type="button" aria-label={`${paused ? "Resume" : "Pause"} Fight Legends preview`} onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</button>
      </div>}
    </div>
    <a className={`${gallery.galleryCaption} ${styles.caption}`} href={item.href}><h3>{item.title}</h3><p>{item.descriptor}</p><span>{item.action} →</span></a>
  </article>;
}
