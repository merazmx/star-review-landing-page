
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  totalStars?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
  editable?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  size = 36,
  onRatingChange,
  initialRating = 0,
  editable = true
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(initialRating);

  const handleMouseOver = (rating: number) => {
    if (editable) {
      setHoveredRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoveredRating(0);
    }
  };

  const handleClick = (rating: number) => {
    if (editable) {
      setSelectedRating(rating);
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        const isHovered = hoveredRating >= ratingValue;
        const isSelected = selectedRating >= ratingValue;

        return (
          <button
            type="button"
            key={index}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onClick={() => handleClick(ratingValue)}
            disabled={!editable}
            aria-label={`Rate ${ratingValue} out of ${totalStars}`}
            className={cn(
              "transition-transform mx-1",
              editable && "hover:scale-110"
            )}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors",
                isSelected || isHovered ? "fill-star text-star" : "fill-none text-star-empty"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
