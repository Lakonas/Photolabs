import React from "react";
import TopicList from "./TopicList"; 
import FavBadge from "./FavBadge"; 
import "../styles/TopNavigationBar.scss"; 

const TopNavigationBar = ({ topics }) => {
  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>

      {/* Pass the topics as props to TopicList */}
      <TopicList topics={topics} />

      {/* Render FavBadge here */}
      <FavBadge />
    </div>
  );
};

export default TopNavigationBar;
