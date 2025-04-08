import React from 'react';

const TopicListItem = ({ label, topicId, fetchPhotosByTopic }) => {
  return (
    <div className="topic-list__item" onClick={() => fetchPhotosByTopic(topicId)}>
      <span>{label}</span>
    </div>
  );
};

export default TopicListItem;
