import React from "react";
import "../styles/TopicList.scss";

// Sample data for topics
const sampleDataForTopicList = [
  { id: 1, slug: "topic-1", title: "People" },
  { id: 2, slug: "topic-2", title: "Nature" },
  { id: 3, slug: "topic-3", title: "Travel" },
  { id: 4, slug: "topic-4", title: "Fashion" },
  { id: 5, slug: "topic-5", title: "Animals" },
];

const TopicList = () => {
  return (
    <div className="top-nav-bar__topic-list">
      {sampleDataForTopicList.map((topic) => (
        <div key={topic.id} className="topic-list__item">
          <span>{topic.title}</span>
        </div>
      ))}
    </div>
  );
};

export default TopicList;
