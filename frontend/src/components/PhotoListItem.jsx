import React from 'react';
import "../styles/PhotoListItem.scss";

const PhotoListItem = ({ id, imageSource, username, profile, location }) => {
  return (
    <div className="photo-list__item" key={id}>
      <img src={imageSource} alt={username} className="photo-list__image" />
      <div className="photo-list__user-details">
        <img src={profile} alt={username} className="photo-list__user-profile" />
        <div className="photo-list__user-info">
          <div>{username}</div>
          <div className="photo-list__user-location">
            {location.city}, {location.country}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoListItem;



