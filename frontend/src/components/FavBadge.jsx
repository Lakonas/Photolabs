import React from 'react';
import FavIcon from './FavIcon'; // Import the FavIcon component
import '../styles/FavBadge.scss'; // Import the styles

const FavBadge = ({ isFavPhotoExist }) => {
  return (
    <div className="fav-badge">
      <FavIcon displayAlert={!!isFavPhotoExist} /> {/* Pass the alert prop */}
    </div>
  );
};

export default FavBadge;
