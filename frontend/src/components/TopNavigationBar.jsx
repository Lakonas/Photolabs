import React from "react";
import TopicList from "./TopicList"; 
import FavBadge from "./FavBadge";  // ✅ Keep only this
import "../styles/TopNavigationBar.scss"; 

const TopNavigationBar = ({ topics, favoritePhotos }) => {
  const hasFavorites = favoritePhotos.length > 0;

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      
      <TopicList topics={topics} />

      {/* ✅ Render just the badge with icon and green dot */}
      <FavBadge isFavPhotoExist={hasFavorites} />
    </div>
  );
};

export default TopNavigationBar;
