import React from "react";

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  let star = [];
  let processedRating = Math.round(rating * 2) / 2;

  for (let index = 0; index < Math.floor(processedRating); index++) {
    star.push(<i className="bx bxs-star text-yellow-400" key={index}></i>);
  }
  if (processedRating % 1 != 0) {
    star.push(
      <span
        key={processedRating}
        className="relative top-0 inline-block h-4 w-2 overflow-hidden"
      >
        <i className="bx bxs-star relative -top-[2px] text-yellow-400"></i>
      </span>
    );
  }
  return <span className="relative mr-3">{star}</span>;
};
