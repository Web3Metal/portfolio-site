"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { galleryItems } from "./portfolio-data";
import { WaveWarzPreview } from "./wave-warz-preview";
import { HomepageMotionPreview } from "./homepage-motion-preview";
import gallery from "./portfolio.module.css";
import styles from "./homepage-gallery.module.css";

// Homepage composition is intentional and independent of the full Gallery grid.
const columns = [
  ["artist-site", "fight-character-edit"],
  ["last-rehearsal", "dadabots-prodigy"],
  ["edge-toonstar", "wave-warz"],
] as const;
const mobileOrder = ["artist-site", "last-rehearsal", "edge-toonstar", "dadabots-prodigy", "fight-character-edit", "wave-warz"] as const;
const mobileQuery = "(max-width: 620px)";
function subscribeToWidth(update: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}
const isMobile = () => window.matchMedia(mobileQuery).matches;
const serverLayout = () => false;

export function HomepageGallery() {
  const mobile = useSyncExternalStore(subscribeToWidth, isMobile, serverLayout);
  // Actual mobile DOM order matches the visual and keyboard reading order.
  const renderItem = (id: typeof mobileOrder[number]) => {
        const item = galleryItems.find(item => item.id === id)!;
        return <div key={item.id} data-home-gallery-item={item.id} className={item.height > item.width ? styles.portrait : styles.item}>
          {"preview" in item ? <WaveWarzPreview /> : "video" in item ? <HomepageMotionPreview item={item} /> :
            <a className={gallery.galleryCard} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
              <div className={gallery.galleryImage}><Image src={item.image} alt={item.alt} width={item.width} height={item.height} unoptimized sizes="(max-width: 620px) calc(100vw - 36px), 30vw" /></div>
              <div className={gallery.galleryCaption}><h3>{item.title}</h3><p>{item.descriptor}</p><span>{item.action} {item.external ? "↗" : "→"}{item.external && <small> · External site</small>}</span></div>
            </a>}
        </div>;
  };
  return <div className={styles.composition}>
    {mobile ? mobileOrder.map(renderItem) : columns.map((ids, column) => <div className={styles.column} data-gallery-column={column + 1} key={column}>
      {ids.map(renderItem)}
    </div>)}
  </div>;
}
