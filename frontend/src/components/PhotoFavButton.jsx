import React from "react";
import "../styles/PhotoFavButton.scss"; // Import styles

// Renders a heart icon button to toggle photo favorites
const PhotoFavButton = ({ isFavorited, toggleFavorite }) => {
  return (
    <div className="photo-list__fav-icon" onClick={toggleFavorite}>
      <div className="photo-list__fav-icon-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill={isFavorited ? 'red' : 'white'} // Red if favorited, white otherwise
          stroke="red"
          strokeWidth="2"
        >
          {/* Heart icon path */}
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
            2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
            3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
            3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
};

export default PhotoFavButton;
