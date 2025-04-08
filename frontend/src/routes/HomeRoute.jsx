import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar'; 
import PhotoList from '../components/PhotoList'; 
import '../styles/HomeRoute.scss'; 

const HomeRoute = ({ photos, topics, favoritePhotos, toggleFavorite, openModal, fetchPhotosByTopic }) => {
  console.log("HomeRoute received openModal:", openModal);
  console.log("HomeRoute photos:", photos);

  return (
    <div className="home-route">
      <TopNavigationBar 
        topics={topics} 
        favoritePhotos={favoritePhotos} 
        fetchPhotosByTopic={fetchPhotosByTopic} 
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
