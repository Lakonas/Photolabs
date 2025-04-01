import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar'; 
import PhotoList from '../components/PhotoList'; 
import '../styles/HomeRoute.scss';

const HomeRoute = ({ photos, topics, favoritePhotos, toggleFavorite }) => {
  return (
    <div className="home-route">
      <TopNavigationBar 
        topics={topics} 
        favoritePhotos={favoritePhotos} 
      />
      <PhotoList 
        photos={photos} 
        favoritePhotos={favoritePhotos} 
        toggleFavorite={toggleFavorite} 
      />
    </div>
  );
};

export default HomeRoute;
