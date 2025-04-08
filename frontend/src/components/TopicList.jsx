import React from 'react';
import TopicListItem from './TopicListItem';
import '../styles/TopicList.scss';

// Renders a list of topics in the top navigation bar
const TopicList = ({ topics, fetchPhotosByTopic }) => {
  return (
    <div className="top-nav-bar__topic-list">
      {topics.map((topic) => (
        <TopicListItem
          key={topic.id} // Unique key for React rendering
          label={topic.title} // Display title of the topic
          topicId={topic.id} // Used to fetch topic-specific photos
          fetchPhotosByTopic={fetchPhotosByTopic} // Callback to fetch topic photos
        />
      ))}
    </div>
  );
};

export default TopicList;
