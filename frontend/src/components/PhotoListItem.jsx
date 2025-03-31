import React from "react";
import "../styles/PhotoListItem.scss"; // Import styles
import PhotoFavButton from "./PhotoFavButton"; // Import Favorite Button

const PhotoListItem = ({ photo }) => {
  return (
    <div className="photo-list__item">
      {/* Favorite button positioned inside the item */}
      <PhotoFavButton />

      <img className="photo-list__image" src={photo.urls.regular} alt={`Photo by ${photo.user.name}`} />

      <div className="photo-list__user-details">
        <img className="photo-list__user-profile" src={photo.user.profile} alt={`${photo.user.name}'s profile`} />
        
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
