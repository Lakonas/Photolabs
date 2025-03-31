import React from "react";
import TopicList from "./components/TopicList"; // Import TopicList
import PhotoList from "./components/PhotoList"; // Import PhotoList

const App = () => {
  return (
    <div className="App">
      {/* Render Topic List as Navigation */}
      <TopicList />
      
      {/* Render Photos Below */}
      <PhotoList />
    </div>
  );
};

export default App;
