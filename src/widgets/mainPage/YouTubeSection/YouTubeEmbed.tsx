"use client";

import React from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  description?: string;
}

export const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-md shadow-md"
        ></iframe>
      </div>
    </div>
  );
};
