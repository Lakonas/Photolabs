import React from 'react';
import HomeRoute from './routes/HomeRoute';
import PhotoDetailsModal from './routes/PhotoDetailsModal';
import useApplicationData from './hooks/useApplicationData';

const App = () => {
  // Destructure state and actions from our custom hook
  const {
    state,
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal,
    fetchPhotosByTopic,
    onSearch //Search
  } = useApplicationData();
  

  return (
    <div className="App">
      {/* Render homepage with photos, topics, and event handlers */}
      <HomeRoute
        photos={state.photos}
        topics={state.topics}
        favoritePhotos={state.favoritePhotos}
        toggleFavorite={updateToFavPhotoIds}
        openModal={onPhotoSelect}
        fetchPhotosByTopic={fetchPhotosByTopic}
        onSearch={onSearch}
      />

      {/* Conditionally render the photo details modal if a photo is selected */}
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
