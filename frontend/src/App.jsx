import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import photos from './mocks/photos'; // Import mock photos data
import topics from './mocks/topics'; // Import mock topics data

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

  const closeModal = () => {
    setSelectedPhoto(null); // Reset selected photo to close the modal
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

      {selectedPhoto && (
        <div 
          className="photo-details-modal-overlay" 
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999
          }}
        >
          <div 
            className="photo-details-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto"
            }}
          >
            <img 
              src={selectedPhoto.urls.full} 
              alt={`Photo by ${selectedPhoto.user.name}`} 
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px"
              }}
            />
            <div>{selectedPhoto.user.name}</div>
            <div>{selectedPhoto.location.city}, {selectedPhoto.location.country}</div>
            {/* Additional modal content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
