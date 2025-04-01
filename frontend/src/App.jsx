import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import photos from './mocks/photos';  // Import mock photos data
import topics from './mocks/topics';  // Import mock topics data

const App = () => {
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  const toggleFavorite = (photoId) => {
    setFavoritePhotos((prevFavorites) => {
      if (prevFavorites.includes(photoId)) {
        return prevFavorites.filter(id => id !== photoId);
      } else {
        return [...prevFavorites, photoId];
      }
    });
  };

  return (
    <div className="App">
      <HomeRoute 
        photos={photos} 
        topics={topics} 
        favoritePhotos={favoritePhotos} 
        toggleFavorite={toggleFavorite} 
      />
    </div>
  );
};

export default App;
