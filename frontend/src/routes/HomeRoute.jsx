import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar'; // Import TopNavigationBar component
import PhotoList from '../components/PhotoList'; // Import PhotoList component
import '../styles/HomeRoute.scss'; // Import HomeRoute styles

const HomeRoute = ({ photos, topics }) => {
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
