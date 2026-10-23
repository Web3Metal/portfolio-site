"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import styles from "./page.module.css";

export function CollectionGrid({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = Array.from(grid.children) as HTMLElement[];
    const cards = items.map(item => item.firstElementChild as HTMLElement);
    let frame = 0;
    let disposed = false;
    let previousWidth = grid.getBoundingClientRect().width;

    function measure() {
      if (!grid) return;
      const computed = getComputedStyle(grid);
      const columns = computed.gridTemplateColumns.split(" ").length;
      if (columns === 1) {
        delete grid.dataset.masonryReady;
        items.forEach(item => item.style.removeProperty("grid-row-end"));
        return;
      }
      const gutter = parseFloat(computed.columnGap);
      // Measure the natural inner card, never its assigned grid track area.
      // One-pixel tracks and zero row gap avoid coarse span rounding shelves.
      const spans = cards.map(card => Math.ceil(card.getBoundingClientRect().height + gutter));
      items.forEach((item, index) => {
        const span = `span ${spans[index]}`;
        if (item.style.gridRowEnd !== span) item.style.gridRowEnd = span;
      });
      grid.dataset.masonryReady = "true";
    }

    function schedule() {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    const observer = new ResizeObserver(entries => {
      const cardChanged = entries.some(entry => entry.target !== grid);
      const width = grid.getBoundingClientRect().width;
      if (cardChanged || Math.abs(width - previousWidth) > 0.25) schedule();
      previousWidth = width;
    });
    observer.observe(grid);
    cards.forEach(card => observer.observe(card));
    grid.addEventListener("loadedmetadata", schedule, true);
    grid.addEventListener("load", schedule, true);
    document.fonts.addEventListener("loadingdone", schedule);
    document.fonts.ready.then(schedule);
    window.addEventListener("resize", schedule);
    measure();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      grid.removeEventListener("loadedmetadata", schedule, true);
      grid.removeEventListener("load", schedule, true);
      document.fonts.removeEventListener("loadingdone", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [children]);

  // Normal row layout is the no-script fallback. Source and focus order never change.
  return <div ref={gridRef} className={styles.grid} data-chamber-masonry>{children}</div>;
}
