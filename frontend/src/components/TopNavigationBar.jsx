import React from "react";
import TopicList from "./TopicList"; 
import FavBadge from "./FavBadge";  
import "../styles/TopNavigationBar.scss"; 

const TopNavigationBar = ({ topics, favoritePhotos, fetchPhotosByTopic }) => {
  const hasFavorites = favoritePhotos.length > 0;

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      
      <TopicList 
        topics={topics} 
        fetchPhotosByTopic={fetchPhotosByTopic} 
      />

      <FavBadge isFavPhotoExist={hasFavorites} />
    </div>
  );
};

export default TopNavigationBar;
