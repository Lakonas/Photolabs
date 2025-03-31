import React from "react";
import TopNavigationBar from "./components/TopNavigationBar"; // Import TopNavigationBar
import TopicList from "./components/TopicList"; // Import TopicList
import PhotoList from "./components/PhotoList"; // Import PhotoList

const App = () => {
  return (
    <div className="App">
      {/* Render Top Navigation Bar */}
      <TopNavigationBar />
      
      {/* Render Topic List as Navigation */}
      <TopicList />
      
      {/* Render Photos Below */}
      <PhotoList />
    </div>
  );
};

export default App;
