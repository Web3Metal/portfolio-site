"use client";

import { useState } from "react";
import styles from "./homepage.module.css";

export function HeroShowPreview() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={styles.heroAtmosphere}>
      <div className={styles.heroGradient} aria-hidden="true">
        <div className={`${styles.heroForm} ${styles.heroSlate}`} style={{ animationPlayState: paused ? "paused" : "running" }} />
        <div className={`${styles.heroForm} ${styles.heroRust}`} style={{ animationPlayState: paused ? "paused" : "running" }} />
      </div>
      <button className={styles.gradientControl} type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume background animation" : "Pause background animation"}>{paused ? "Resume motion" : "Pause motion"}</button>
    </div>
  );
}
