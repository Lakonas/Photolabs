import React from 'react';
import TopicListItem from './TopicListItem'; // Import TopicListItem component
import '../styles/TopicList.scss'; // Import styles

const topics = [
  { id: 1, title: "People" },
  { id: 2, title: "Nature" },
  { id: 3, title: "Travel" },
  { id: 4, title: "Fashion" },
  { id: 5, title: "Animals" },
];

const TopicList = () => {
  return (
    <div className="top-nav-bar__topic-list">
      {topics.map((topic) => (
        <TopicListItem key={topic.id} label={topic.title} />
      ))}
    </div>
  );
};

export default TopicList;
