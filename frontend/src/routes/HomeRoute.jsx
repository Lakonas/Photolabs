import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar'; // Import TopNavigationBar component
import PhotoList from '../components/PhotoList'; // Import PhotoList component
import photos from '../mocks/photos'; // Assuming mock data for photos
import topics from '../mocks/topics'; // Assuming mock data for topics
import '../styles/HomeRoute.scss'; // Import HomeRoute styles

const HomeRoute = () => {
  return (
    <div className="home-route">
      {/* Pass topics as props to TopNavigationBar */}
      <TopNavigationBar topics={topics} />

      {/* Render PhotoList with photos passed as props */}
      <PhotoList photos={photos} />
    </div>
  );
};

export default HomeRoute;
