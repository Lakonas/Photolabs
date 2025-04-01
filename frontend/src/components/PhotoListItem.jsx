import React from "react";
import PhotoFavButton from "./PhotoFavButton"; // Import Favorite Button
import "../styles/PhotoListItem.scss"; // Import styles

const PhotoListItem = ({ photo, favoritePhotos, toggleFavorite }) => {
  const isFavorited = favoritePhotos.includes(photo.id);

  return (
    <div className="photo-list__item">
      <PhotoFavButton 
        isFavorited={isFavorited} 
        toggleFavorite={() => toggleFavorite(photo.id)} 
      />
      <img 
        className="photo-list__image" 
        src={photo.urls.regular} 
        alt={`Photo by ${photo.user.name}`} 
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
