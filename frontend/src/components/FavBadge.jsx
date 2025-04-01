import React from "react";
import "../styles/FavBadge.scss";

const FavBadge = ({ isFavPhotoExist }) => {
  return (
    <div className="fav-badge">
      {isFavPhotoExist && (
        <div className="fav-badge__notification">
          You have favorited photos!
        </div>
      )}
    </div>
  );
};

export default FavBadge;
