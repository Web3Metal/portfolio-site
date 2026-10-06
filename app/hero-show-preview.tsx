"use client";

import { useState } from "react";
import styles from "./homepage.module.css";

export function HeroShowPreview() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={styles.heroAtmosphere}>
      <div className={styles.heroGradient} aria-hidden="true" style={{ animationPlayState: paused ? "paused" : "running" }} />
      <button className={styles.gradientControl} type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume background animation" : "Pause background animation"}>{paused ? "Resume motion" : "Pause motion"}</button>
    </div>
  );
}
