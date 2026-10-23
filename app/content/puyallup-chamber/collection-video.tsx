"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./page.module.css";

type Video = { title: string; src: string; poster: string; width: number; height: number };

export function CollectionVideo({ title, src, poster, width, height }: Video) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = useId();
  const [reducedMotion, setReducedMotion] = useState(true);
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [requested, setRequested] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(preference.matches);
      setRequested(false);
      setPaused(false);
    };
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    update();
    updateVisibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Attach media just before arrival, but only play while actually in view.
    const nearby = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        nearby.disconnect();
      }
    }, { rootMargin: "200px 0px" });
    const inView = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio > 0);
    });
    nearby.observe(container);
    inView.observe(container);
    return () => {
      nearby.disconnect();
      inView.disconnect();
    };
  }, []);

  const attached = entered && (!reducedMotion || requested);
  const shouldPlay = attached && visible && documentVisible && !paused;
  useEffect(() => {
    const video = videoRef.current;
    if (shouldPlay) video?.play().catch(() => {});
    else video?.pause();
  }, [shouldPlay]);

  const action = playing ? "Pause loop" : paused ? "Resume loop" : "Play loop";
  function toggle() {
    if (playing) setPaused(true);
    else {
      setRequested(true);
      setPaused(false);
      // Also retry directly on a gesture if a browser blocked automatic playback.
      if (attached && visible && documentVisible) videoRef.current?.play().catch(() => {});
    }
  }

  return <div ref={containerRef} className={styles.media} style={{ aspectRatio: `${width} / ${height}` }}>
    <video id={videoId} ref={videoRef} src={attached ? src : undefined} autoPlay={shouldPlay} loop muted playsInline preload="none" poster={poster} width={width} height={height} aria-label={title} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <button type="button" className={styles.motionButton} aria-label={`${action}: ${title}`} aria-controls={videoId} onClick={toggle}>{action}</button>
  </div>;
}
