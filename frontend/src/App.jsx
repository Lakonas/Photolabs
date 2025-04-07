import React from 'react';
import HomeRoute from './routes/HomeRoute';
import PhotoDetailsModal from './routes/PhotoDetailsModal';
import FavBadge from './components/FavBadge';
import photos from './mocks/photos';
import topics from './mocks/topics';
import useApplicationData from './hooks/useApplicationData'; // 👈 custom hook

const App = () => {
  const {
    state,
    onPhotoSelect,
    updateToFavPhotoIds,
    onClosePhotoDetailsModal
  } = useApplicationData();

  return (
    <div className="App">
      {/* Favorite notification icon (top right) */}
      <FavBadge isFavPhotoExist={state.favoritePhotos.length > 0} />

      {/* Main homepage */}
      <HomeRoute
        photos={photos}
        topics={topics}
        favoritePhotos={state.favoritePhotos}
        toggleFavorite={updateToFavPhotoIds}
        openModal={onPhotoSelect}
      />

      {/* Photo Details Modal */}
      {state.selectedPhoto && (
        <PhotoDetailsModal
          selectedPhoto={state.selectedPhoto}
          closeModal={onClosePhotoDetailsModal}
          favoritePhotos={state.favoritePhotos}
          toggleFavorite={updateToFavPhotoIds}
        />
      )}
    </div>
  );
};

export default App;
