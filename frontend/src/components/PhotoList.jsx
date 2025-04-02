import React from "react";
import PhotoListItem from "./PhotoListItem"; // Import PhotoListItem
import "../styles/PhotoList.scss";

const PhotoList = ({ photos, favoritePhotos, toggleFavorite, openModal }) => {
  console.log("PhotoList received openModal:", openModal); // Debugging log

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
