import React, { useState } from "react";
import TopicList from "./TopicList";
import FavBadge from "./FavBadge";
import "../styles/TopNavigationBar.scss";

const TopNavigationBar = ({ 
  topics, 
  favoritePhotos, 
  fetchPhotosByTopic, 
  onSearch,
  user,
  logout
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const hasFavorites = favoritePhotos.length > 0;

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>

      <input
        type="text"
        className="top-nav-bar__search"
        placeholder="Search by city or country..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <TopicList
        topics={topics}
        fetchPhotosByTopic={fetchPhotosByTopic}
      />

      <div className="top-nav-bar__user-section">
        <span className="top-nav-bar__username">
          Welcome, {user?.username}!
        </span>
        <button 
          className="top-nav-bar__logout"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <FavBadge isFavPhotoExist={hasFavorites} />
    </div>
  );
};

export default TopNavigationBar;