import React from 'react';
import PhotoListItem from './PhotoListItem'; 
import "../styles/PhotoList.scss";

const PhotoList = ({ photos, favoritePhotos, toggleFavorite, openModal }) => {
  console.log("PhotoList received photos:", photos); // Debugging log

  if (!Array.isArray(photos)) {
    console.error("Error: PhotoList expected an array but got", photos);
    return null; // Prevents crash
  }

  return (
    <div className="photo-list">
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
