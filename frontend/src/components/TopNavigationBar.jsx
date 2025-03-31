import React from "react";
import TopicList from "./TopicList"; // Import the TopicList component
import FavBadge from "./FavBadge"; // Import the FavBadge component
import "../styles/TopNavigationBar.scss"; // Assuming the CSS file is correct

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
