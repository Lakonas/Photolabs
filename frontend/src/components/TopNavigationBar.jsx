import React from "react";
import TopicList from "./TopicList"; 
import FavIcon from "./FavIcon";  // Import the FavIcon component
import FavBadge from "./FavBadge";  // Import the FavBadge component
import "../styles/TopNavigationBar.scss"; 

const TopNavigationBar = ({ topics, favoritePhotos }) => {
  // Derive hasFavorites from favoritePhotos
  const hasFavorites = favoritePhotos.length > 0;

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      
      {/* Render TopicList */}
      <TopicList topics={topics} />
      
      {/* Render FavIcon */}
      <FavIcon displayAlert={hasFavorites} />
      
      {/* Render FavBadge with isFavPhotoExist */}
      <FavBadge isFavPhotoExist={hasFavorites} />
    </div>
  );
};

export default TopNavigationBar;
