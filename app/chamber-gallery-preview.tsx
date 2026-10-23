"use client";

import { useEffect, useRef, useState } from "react";
import { chamberGalleryItem as item } from "./content/puyallup-chamber/data";
import gallery from "./portfolio.module.css";
import styles from "./homepage-gallery.module.css";

export function ChamberGalleryPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setEntered(true);
    }, { threshold: 0.15 });
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (motionAllowed && visible && !paused) video?.play().catch(() => {});
    else video?.pause();
  }, [motionAllowed, visible, paused]);

  return <article className={gallery.galleryCard}>
    <div ref={previewRef} className={styles.preview}>
      <a className={styles.previewLink} href={item.href} aria-label={`View ${item.title} collection`}>
        <video ref={videoRef} autoPlay={motionAllowed && visible && !paused} loop muted playsInline preload="none" poster={item.poster} width={item.width} height={item.height} aria-hidden="true">
          {motionAllowed && entered && <source src={item.video} type="video/mp4" />}
        </video>
      </a>
      {motionAllowed && <div className={styles.controls}>
        <button type="button" aria-label={`${paused ? "Resume" : "Pause"} Chamber door animation`} onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</button>
      </div>}
    </div>
    <a className={`${gallery.galleryCaption} ${styles.caption}`} href={item.href}><h3>{item.title}</h3><p>{item.descriptor}</p><span>{item.action}</span></a>
  </article>;
}
