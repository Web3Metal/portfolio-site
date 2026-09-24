"use client";

import type { VideoHTMLAttributes } from "react";

export default function VideoPlayer(props: VideoHTMLAttributes<HTMLVideoElement>) {
  return (
    <video
      {...props}
      onPlay={(event) => {
        document.querySelectorAll("video").forEach((video) => {
          if (video !== event.currentTarget) video.pause();
        });
      }}
    />
  );
}