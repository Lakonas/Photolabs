import React, { useState } from 'react';
import FavBadge from './FavBadge'; // Import the FavBadge component
import '../styles/TopNavigationBar.scss'; // Import the styles

const TopNavigationBar = () => {
  // Manage the state for favorite photos
  const [isFavPhotoExist, setIsFavPhotoExist] = useState(false);

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>

      {/* Display FavBadge with the alert if there's a favorite photo */}
      <FavBadge isFavPhotoExist={isFavPhotoExist} />
    </div>
  );
};

export default TopNavigationBar;
