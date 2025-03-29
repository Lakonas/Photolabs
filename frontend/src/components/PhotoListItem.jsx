import React from 'react';
import '../styles/PhotoListItem.scss';
import PhotoFavButton from './PhotoFavButton';

const PhotoListItem = ({ photo }) => {
  return (
    <div className="photo-list__item">
      <PhotoFavButton photo={photo} />
      <img src={photo.imageSource} alt={photo.username} className="photo-list__image" />
      <div className="photo-list__user-details">
        <img src={photo.profile} alt={photo.username} className="photo-list__user-profile" />
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
