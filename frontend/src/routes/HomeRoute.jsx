import React from "react";
import TopNavigationBar from "../components/TopNavigationBar";  // Import TopNavigationBar
import PhotoList from "../components/PhotoList";  // Import PhotoList
import "../styles/HomeRoute.scss";

const HomeRoute = ({ photos, topics }) => {
  return (
    <div className="home-route">
      {/* Pass topics to the TopNavigationBar */}
      <TopNavigationBar topics={topics} />
      
      {/* Pass photos to the PhotoList */}
      <PhotoList photos={photos} />
    </div>
  );
};

export default HomeRoute;
