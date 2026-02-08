import React, { useState } from "react";
import TopicList from "./TopicList"; 
import FavBadge from "./FavBadge";  
import "../styles/TopNavigationBar.scss"; 


// Top navigation bar component
const TopNavigationBar = ({ topics, favoritePhotos, fetchPhotosByTopic, onSearch }) => {
  //Local state for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Check if any favorites exist to show badge indicator
  const hasFavorites = favoritePhotos.length > 0;

  //Handle sewarch input chanage
  const handleSearchChange = (event) => {
    const value  = event.target.value;
    setSearchTerm(value);
    //Call search function passed from parent
    onSearch(value);
  };


  return (
    <div className="top-nav-bar">
      {/* App logo/title */}
      <span className="top-nav-bar__logo">PhotoLabs</span>

      {/* Search Input - new!*/}
      <input
        type="text"
        className="top-nav-bar__search"
        placeholder="Search by city or country"
        value={searchTerm}
        onChange={handleSearchChange}
        />
      
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
