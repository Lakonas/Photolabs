import React from 'react';
import TopNavigationBar from '../components/TopNavigationBar'; 
import PhotoList from '../components/PhotoList'; 
import '../styles/HomeRoute.scss'; 

// Main homepage layout that renders the top navigation and photo gallery
const HomeRoute = ({ 
  photos, 
  topics, 
  favoritePhotos, 
  toggleFavorite, 
  openModal, 
  fetchPhotosByTopic,
  onSearch  
}) => {
  return (
    <div className="home-route">
      {/* Top bar with logo, topics, and favorite badge */}
      <TopNavigationBar 
        topics={topics} 
        favoritePhotos={favoritePhotos} 
        fetchPhotosByTopic={fetchPhotosByTopic} 
        onSearch={onSearch}  // ← Now this works!
      />

      {/* Main gallery of photos */}
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