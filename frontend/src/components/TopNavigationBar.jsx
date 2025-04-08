import React from "react";
import TopicList from "./TopicList"; 
import FavBadge from "./FavBadge";  
import "../styles/TopNavigationBar.scss"; 

// Top navigation bar component
const TopNavigationBar = ({ topics, favoritePhotos, fetchPhotosByTopic }) => {
  // Check if any favorites exist to show badge indicator
  const hasFavorites = favoritePhotos.length > 0;

  return (
    <div className="top-nav-bar">
      {/* App logo/title */}
      <span className="top-nav-bar__logo">PhotoLabs</span>
      
      {/* List of clickable topics */}
      <TopicList 
        topics={topics} 
        fetchPhotosByTopic={fetchPhotosByTopic} 
      />

      {/* Favorite icon badge with green dot if favorites exist */}
      <FavBadge isFavPhotoExist={hasFavorites} />
    </div>
  );
};

export default TopNavigationBar;
