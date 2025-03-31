import React from "react";
import "../styles/TopicListItem.scss"; // Import styles

const TopicListItem = ({ label }) => {
  return (
    <li className="topic-list__item">
      <span>{label}</span>
    </li>
  );
};


TopicListItem.defaultProps = {
  label: "Nature",
};

export default TopicListItem;
