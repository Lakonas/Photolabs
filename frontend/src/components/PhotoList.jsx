import React from "react";
import PhotoListItem from "./PhotoListItem"; // Import PhotoListItem
import "../styles/PhotoList.scss";

const PhotoList = ({ photos, favoritePhotos, toggleFavorite, openModal }) => {
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
