import React from 'react';
import "../styles/PhotoListItem.scss"; // Importing the provided Sass file

const PhotoListItem = ({ photo }) => {
  return (
    <div className="photo-list__item" key={photo.id}>
      <img 
        src={photo.imageSource} 
        alt={photo.username} 
        className="photo-list__image" // Applying the provided Sass class for image
      />
      <div className="photo-list__user-details">
        <img 
          src={photo.profile} 
          alt={photo.username} 
          className="photo-list__user-profile" // Applying the provided Sass class for profile
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
