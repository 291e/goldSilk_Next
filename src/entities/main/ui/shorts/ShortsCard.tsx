"use client";

import React from "react";

interface ShortsCardProps {
  id: string;
}

export const ShortsCard = ({ id }: ShortsCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      <iframe
        className="w-full h-64"
        src={`https://www.youtube.com/embed/${id}?autoplay=0&mute=1&loop=1&playlist=${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
