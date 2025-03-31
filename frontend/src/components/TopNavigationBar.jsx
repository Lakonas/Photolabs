import React from 'react';
import TopicList from './TopicList'; 
import FavBadge from './FavBadge'; 
import '../styles/TopNavigationBar.scss'; 

const TopNavigationBar = ({ hasFavorites }) => {
  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      
      {/* Topic Navigation */}
      <TopicList />

      {/* Display FavBadge if favorites exist */}
      <FavBadge isFavPhotoExist={hasFavorites} />
    </div>
  );
};

export default TopNavigationBar;
