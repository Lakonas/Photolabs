import React from "react";
import PhotoFavButton from "./PhotoFavButton"; 
import "../styles/PhotoListItem.scss"; 

// Represents a single photo item in the photo list
const PhotoListItem = ({ photo, favoritePhotos, toggleFavorite, openModal }) => {
  const isFavorited = (favoritePhotos || []).includes(photo.id); // Check if this photo is a favorite

  return (
    <div className="photo-list__item">
      {/* Heart icon button to toggle favorite */}
      <PhotoFavButton 
        isFavorited={isFavorited} 
        toggleFavorite={() => toggleFavorite(photo.id)} 
      />

      {/* Clickable photo to open the modal */}
      <img 
        className="photo-list__image" 
        src={photo.urls.regular} 
        alt={`Photo by ${photo.user.name}`} 
        onClick={() => openModal(photo)} 
      />

      {/* Photographer details */}
      <div className="photo-list__user-details">
        <img 
          className="photo-list__user-profile" 
          src={photo.user.profile} 
          alt={`${photo.user.name}'s profile`} 
        />
        <div className="photo-list__user-info">
          <div>{photo.user.name}</div>
          <div className="photo-list__user-location">
            {photo.location.city}, {photo.location.country}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoListItem;
