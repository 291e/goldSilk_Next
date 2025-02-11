"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

export const StarRating = ({ rating, onChange }: StarRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={24}
          className={`cursor-pointer transition ${
            value <= (hover ?? rating) ? "text-yellow-500" : "text-gray-300"
          }`}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange(value)}
        />
      ))}
    </div>
  );
};
