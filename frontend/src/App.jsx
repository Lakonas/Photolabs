import React from "react";
import HomeRoute from "./routes/HomeRoute"; // Import the HomeRoute

import photos from './mocks/photos';  // Import mock data for photos
import topics from './mocks/topics';  // Import mock data for topics

const App = () => {
  return (
    <div className="App">
      {/* Pass the mock data to HomeRoute */}
      <HomeRoute photos={photos} topics={topics} />
    </div>
  );
};

export default App;
