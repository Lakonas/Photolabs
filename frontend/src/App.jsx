import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import photos from './mocks/photos'; 
import topics from './mocks/topics'; 
import PhotoDetailsModal from './routes/PhotoDetailsModal'; 

const App = () => {
  const [favoritePhotos, setFavoritePhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null); 

  const toggleFavorite = (photoId) => {
    setFavoritePhotos(prevState => 
      prevState.includes(photoId)
        ? prevState.filter(id => id !== photoId)  
        : [...prevState, photoId]  
    );
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo); 
  };

  const closeModal = () => {
    setSelectedPhoto(null); 
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

      {/* Show the modal only when a photo is selected */}
      {selectedPhoto && (
        <PhotoDetailsModal selectedPhoto={selectedPhoto} closeModal={closeModal} /> 
      )}
    </div>
  );
};

export default App;
