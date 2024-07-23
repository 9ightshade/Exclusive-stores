// ProductRating.js
import React, { useState } from "react";
import PropTypes from "prop-types";

const ProductRating = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleStarClick = (clickedIndex) => {
    const newRating = clickedIndex + 1;
    setRating(newRating);
  };

  const handleStarHover = (hoveredIndex) => {
    setHoveredRating(hoveredIndex + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const starType =
        i < rating
          ? "fas fa-star text-yellow-500"
          : i < hoveredRating
          ? "fas fa-star text-gray-400"
          : "far fa-star";

      stars.push(
        <i
          key={i}
          className={`cursor-pointer ${starType}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleMouseLeave}
        ></i>
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars()}
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

ProductRating.propTypes = {
  initialRating: PropTypes.number.isRequired,
};

export default ProductRating;
