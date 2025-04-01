import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar'; // Import TopNavigationBar component
import PhotoList from '../components/PhotoList'; // Import PhotoList component
import '../styles/HomeRoute.scss'; // Import HomeRoute styles

const HomeRoute = ({ photos, topics, favoritePhotos, toggleFavorite }) => {
  return (
    <div className="home-route">
      {/* Pass topics and favoritePhotos to TopNavigationBar */}
      <TopNavigationBar 
        topics={topics} 
        favoritePhotos={favoritePhotos}  // Pass favoritePhotos prop
      />
      {/* Render PhotoList with photos passed as props */}
      <PhotoList 
        photos={photos} 
        favoritePhotos={favoritePhotos}  // Pass favoritePhotos to PhotoList
        toggleFavorite={toggleFavorite}  // Pass toggleFavorite function to PhotoList
      />
    </div>
  );
};

export default HomeRoute;
