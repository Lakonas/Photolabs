import React from 'react';

// Renders a single topic item and triggers a photo fetch when clicked
const TopicListItem = ({ label, topicId, fetchPhotosByTopic }) => {
  return (
    <div 
      className="topic-list__item" 
      onClick={() => fetchPhotosByTopic(topicId)} // Fetch photos for the selected topic
    >
      <span>{label}</span> {/* Topic title */}
    </div>
  );
};

export default TopicListItem;
