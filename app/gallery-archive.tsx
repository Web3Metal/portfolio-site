"use client";

import { useEffect, useRef, useState } from "react";
import { chamberArchiveItem as item } from "./content/puyallup-chamber/data";
import styles from "./gallery-archive.module.css";

export function GalleryArchive() {
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

  return <section id="gallery-archive" className={styles.archive} aria-labelledby="gallery-archive-heading">
    <h3 id="gallery-archive-heading">Gallery archive</h3>
    <article className={styles.entry} data-gallery-archive-item="puyallup-chamber">
      <div ref={previewRef} className={styles.preview}>
        <a href={item.href} aria-label={`View ${item.title} collection`}>
          <video ref={videoRef} autoPlay={motionAllowed && visible && !paused} loop muted playsInline preload="none" poster={item.poster} width={item.width} height={item.height} aria-hidden="true">
            {motionAllowed && entered && <source src={item.video} type="video/mp4" />}
          </video>
        </a>
        {motionAllowed && <button type="button" className={styles.motionButton} aria-label={`${paused ? "Resume" : "Pause"} Chamber door animation`} onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</button>}
      </div>
      <div className={styles.copy}>
        <h4><a href={item.href}>{item.title}</a></h4>
        <p>{item.descriptor}</p>
        <a className={styles.action} href={item.href}>{item.action}</a>
      </div>
    </article>
  </section>;
}
