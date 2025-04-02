import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import photos from './mocks/photos'; // Import mock photos data
import topics from './mocks/topics'; // Import mock topics data
import PhotoDetailsModal from './routes/PhotoDetailsModal'; // Import PhotoDetailsModal

const App = () => {
  const [favoritePhotos, setFavoritePhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Added state to manage selected photo

  const toggleFavorite = (photoId) => {
    setFavoritePhotos(prevState => 
      prevState.includes(photoId)
        ? prevState.filter(id => id !== photoId)  // Remove from favorites
        : [...prevState, photoId]  // Add to favorites
    );
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo); // Set selected photo when clicked
  };

  return (
    <div className="App">
      <HomeRoute 
        photos={photos} 
        topics={topics} 
        favoritePhotos={favoritePhotos} 
        toggleFavorite={toggleFavorite}
        openModal={openModal} 
      />

      {/* Only show the modal when a photo is selected */}
      <PhotoDetailsModal 
        selectedPhoto={selectedPhoto} 
      />
    </div>
  );
};

export default App;
