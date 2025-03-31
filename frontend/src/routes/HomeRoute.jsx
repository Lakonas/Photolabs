import React, { useState } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import PhotoList from "../components/PhotoList";
import "../styles/HomeRoute.scss";

const HomeRoute = () => {
  const [favoritePhotos, setFavoritePhotos] = useState(new Set());

  const toggleFavorite = (photoId) => {
    setFavoritePhotos((prevFavs) => {
      const updatedFavs = new Set(prevFavs);
      if (updatedFavs.has(photoId)) {
        updatedFavs.delete(photoId);
      } else {
        updatedFavs.add(photoId);
      }
      return updatedFavs;
    });
  };

  return (
    <div className="home-route">
      <TopNavigationBar hasFavorites={favoritePhotos.size > 0} />
      <PhotoList toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default HomeRoute;
