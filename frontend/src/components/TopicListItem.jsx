import React from "react";
import "../styles/TopicListItem.scss";

const TopicListItem = ({ label }) => {
  return (
    <div className="topic-list__item">
      <span>{label}</span>
    </div>
  );
};

// Default props (in case no label is provided)
TopicListItem.defaultProps = {
  label: "Default Topic",
};

export default TopicListItem;
