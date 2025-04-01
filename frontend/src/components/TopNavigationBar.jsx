import React from "react";
import TopicList from "./TopicList"; 
import FavIcon from "./FavIcon";  // Import the FavIcon component
import "../styles/TopNavigationBar.scss"; 

const TopNavigationBar = ({ topics, favoritePhotos }) => {
  const hasFavorites = favoritePhotos.length > 0;

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      <TopicList topics={topics} />
      
      {/* Render FavIcon with conditionally rendered alert based on favorite photos */}
      <FavIcon displayAlert={hasFavorites} />
    </div>
  );
};

export default TopNavigationBar;
