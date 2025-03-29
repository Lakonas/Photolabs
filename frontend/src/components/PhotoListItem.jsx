import React from 'react';
import "../styles/PhotoListItem.scss";

const PhotoListItem = ({ photo }) => {
  return (
    <div className="photo-list__item" key={photo.id}>
      <img 
        src={photo.imageSource} 
        alt={photo.username} 
        className="photo-list__image" 
        style={{ border: "3px solid #ccc" }} 
      />
      <div className="photo-list__user-details">
        <img 
          src={photo.profile} 
          alt={photo.username} 
          className="photo-list__user-profile"
          style={{ border: "2px solid #555" }} 
        />
        <div className="photo-list__user-info">
          <div>{photo.username}</div>
          <div className="photo-list__user-location">
            {photo.location.city}, {photo.location.country}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoListItem;
