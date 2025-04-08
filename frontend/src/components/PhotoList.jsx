import React from 'react';
import PhotoListItem from './PhotoListItem'; 
import "../styles/PhotoList.scss";

// Renders a list of photos using the PhotoListItem component
const PhotoList = ({ photos, favoritePhotos, toggleFavorite, openModal }) => {
  // Debugging log to verify received photo data
  console.log("PhotoList received photos:", photos); 

  // Prevents rendering if photos is not an array
  if (!Array.isArray(photos)) {
    console.error("Error: PhotoList expected an array but got", photos);
    return null;
  }

  return (
    <div className="photo-list">
      {/* Render each photo as a PhotoListItem */}
      {photos.map((photo) => (
        <PhotoListItem
          key={photo.id}
          photo={photo}
          favoritePhotos={favoritePhotos}
          toggleFavorite={toggleFavorite}
          openModal={openModal} 
        />
      ))}
    </div>
  );
};

export default PhotoList;
