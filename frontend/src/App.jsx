import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import photos from './mocks/photos'; 
import topics from './mocks/topics'; 
import PhotoDetailsModal from './routes/PhotoDetailsModal';
import FavIcon from './components/FavIcon'; // Make sure this path is correct
import FavBadge from './components/FavBadge'; // Make sure this path is correct

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

      {/* Global favorite notification icons */}
      <FavIcon displayAlert={favoritePhotos.length > 0} />
      <FavBadge isFavPhotoExist={favoritePhotos.length > 0} />

      <HomeRoute 
        photos={photos}
        topics={topics}
        favoritePhotos={favoritePhotos}
        toggleFavorite={toggleFavorite}
        openModal={openModal}
      />

      {/* Modal for photo details */}
      {selectedPhoto && (
        <PhotoDetailsModal
          selectedPhoto={selectedPhoto}
          closeModal={closeModal}
          favoritePhotos={favoritePhotos}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default App;
