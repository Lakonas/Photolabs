import React from 'react';
import HomeRoute from './routes/HomeRoute';
import PhotoDetailsModal from './routes/PhotoDetailsModal';
import useApplicationData from './hooks/useApplicationData';



const App = () => {
  const {
    state,
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal,
    fetchPhotosByTopic
    
  } = useApplicationData();
  console.log("Photos in state:", state.photos);
  return (
    <div className="App">
      <HomeRoute
        photos={state.photos}
        topics={state.topics}
        favoritePhotos={state.favoritePhotos}
        toggleFavorite={updateToFavPhotoIds}
        openModal={onPhotoSelect}
        fetchPhotosByTopic={fetchPhotosByTopic}
      />
      
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
