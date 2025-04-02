import React from "react";
import PhotoFavButton from "./PhotoFavButton"; 
import "../styles/PhotoListItem.scss"; 

const PhotoListItem = ({ photo, favoritePhotos, toggleFavorite, openModal }) => {
  const isFavorited = favoritePhotos.includes(photo.id);

  return (
    <div className="photo-list__item" >
      <PhotoFavButton 
        isFavorited={isFavorited} 
        toggleFavorite={() => toggleFavorite(photo.id)} 
      />
      <img 
        className="photo-list__image" 
        src={photo.urls.regular} 
        alt={`Photo by ${photo.user.name}`} 
        onClick={() => openModal(photo)} // Open modal when clicked
      />
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
