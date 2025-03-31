import React from "react";
import HomeRoute from "./routes/HomeRoute";
import photos from './mocks/photos'; // Import mock photos data
import topics from './mocks/topics'; // Import mock topics data

const App = () => {
  return (
    <div className="App">
      {/* Pass photos and topics as props to HomeRoute */}
      <HomeRoute photos={photos} topics={topics} />
    </div>
  );
};

export default App;
