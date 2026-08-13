"use client";

import { Star } from "lucide-react";
import { useState } from "react";

type StarRatingProps = {
  value: number;
  onChange: (rating: number) => void;
  size?: "md" | "lg";
};

export default function StarRating({
  value,
  onChange,
  size = "lg",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const iconSize =
    size === "lg" ? "w-8 h-8 sm:w-10 sm:h-10" : "w-7 h-7 sm:w-8 sm:h-8";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-1">
      <div className="flex items-center gap-0.5 sm:gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= (hovered || value);
          return (
            <button
              key={star}
              type="button"
              aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onChange(star)}
              className="p-1.5 sm:p-1 rounded-md transition-transform active:scale-95 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-misau-gold min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Star
                className={`${iconSize} ${
                  active
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-transparent text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>
      <span className="text-sm font-medium text-misau-medium sm:ml-2">
        {value > 0 ? `${value}/5` : "Seleccione a classificação"}
      </span>
    </div>
  );
}

export function StarRatingDisplay({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "md" | "lg";
}) {
  const iconSize = size === "lg" ? "w-5 h-5 sm:w-6 sm:h-6" : "w-4 h-4 sm:w-5 sm:h-5";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${iconSize} ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-transparent text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
