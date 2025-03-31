import React from "react";
import PhotoListItem from "./PhotoListItem"; // Import PhotoListItem
import "../styles/PhotoList.scss";

const PhotoList = ({ photos }) => {
  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <PhotoListItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default PhotoList;
