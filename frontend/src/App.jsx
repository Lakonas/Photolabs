import React, { useState } from "react";
import TopNavigationBar from "./components/TopNavigationBar"; // Import TopNavigationBar
import PhotoList from "./components/PhotoList"; // Import PhotoList

const App = () => {
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
    <div className="App">
      {/* Render Top Navigation Bar with favorite tracking */}
      <TopNavigationBar hasFavorites={favoritePhotos.size > 0} />
      
      {/* Render Photos Below */}
      <PhotoList toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default App;
