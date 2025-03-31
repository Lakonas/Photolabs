import React from 'react';

const TopicListItem = ({ label }) => {
  return (
    <div className="topic-list__item">
      <span>{label}</span>
    </div>
  );
};

export default TopicListItem;
