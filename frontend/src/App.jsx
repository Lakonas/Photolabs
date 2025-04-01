import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import photos from './mocks/photos'; // Import mock photos data
import topics from './mocks/topics'; // Import mock topics data

const App = () => {
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  const toggleFavorite = (photoId) => {
    setFavoritePhotos(prevState => 
      prevState.includes(photoId)
        ? prevState.filter(id => id !== photoId)  // Remove from favorites
        : [...prevState, photoId]  // Add to favorites
    );
  };

  return (
    <div className="App">
      <HomeRoute 
        photos={photos} 
        topics={topics} 
        favoritePhotos={favoritePhotos} 
        toggleFavorite={toggleFavorite}  // Pass toggleFavorite function
      />
    </div>
  );
};

export default App;
