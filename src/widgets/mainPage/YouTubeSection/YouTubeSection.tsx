"use client";

import React from "react";
import { YouTubeEmbed } from "./YouTubeEmbed";

const videos = [
  { videoId: "61NQsrm9QMI" },
  { videoId: "FI0oGtT8Iqg" },
  { videoId: "uVXKN_TYwf0" },
];

export const YouTubeSection = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 rounded-md">
      {videos.map((video) => (
        <YouTubeEmbed key={video.videoId} videoId={video.videoId} />
      ))}
    </section>
  );
};
