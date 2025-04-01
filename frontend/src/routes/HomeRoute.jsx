import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar'; 
import PhotoList from '../components/PhotoList'; 
import '../styles/HomeRoute.scss'; 

const HomeRoute = ({ photos, topics, favoritePhotos, toggleFavorite, openModal }) => {
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
        openModal={openModal}  
      />
    </div>
  );
};

export default HomeRoute;
