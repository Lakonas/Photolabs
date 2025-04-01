import React from "react";
import TopicList from "./TopicList"; 
import FavIcon from "./FavIcon";  // Import the FavIcon component
import "../styles/TopNavigationBar.scss"; 

const TopNavigationBar = ({ topics, favoritePhotos }) => {
  const hasFavorites = favoritePhotos.length > 0;

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      
      {/* Render TopicList */}
      <TopicList topics={topics} />
      
      {/* Render FavIcon */}
      <FavIcon displayAlert={hasFavorites} />

      {/* Conditional notification when there are favorited photos */}
      {hasFavorites && (
        <div className="top-nav-bar__notification">
          You have favorited photos!
        </div>
      )}
    </div>
  );
};

export default TopNavigationBar;
