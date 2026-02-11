import React, { useState } from 'react';
import HomeRoute from './routes/HomeRoute';
import PhotoDetailsModal from './routes/PhotoDetailsModal';
import useApplicationData from './hooks/useApplicationData';
import useAuth from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PhotoUploadForm from './components/PhotoUploadForm';

const App = () => {
  const {
    state,
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal,
    fetchPhotosByTopic,
    onSearch
  } = useApplicationData();

  const { user, loading, logout, login, register } = useAuth(); 
  const [showRegister, setShowRegister] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  console.log('🟣 App rendered! user:', user, 'loading:', loading); 

  const handleUploadClick = () => {
    setShowUpload(true);
  };
  
  const handleUploadSuccess = (newPhoto) => {
    // Refresh photos to show the new upload
    
    console.log('New photo uploaded:', newPhoto);
    window.location.reload(); 
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '24px',
        color: '#667eea'
      }}>
        Loading...
      </div>
    );
  }

  // If not logged in, show login/register
  if (!user) {
    return showRegister ? (
      <RegisterForm 
        onSwitchToLogin={() => setShowRegister(false)}
        register={register}  
      />
    ) : (
      <LoginForm 
        onSwitchToRegister={() => setShowRegister(true)}
        login={login}  
      />
    );
  }

  // User is logged in, show main app
  return (
    <div className="App">
     <HomeRoute
        photos={state.photos}
        topics={state.topics}
        favoritePhotos={state.favoritePhotos}
        toggleFavorite={updateToFavPhotoIds}
        openModal={onPhotoSelect}
        fetchPhotosByTopic={fetchPhotosByTopic}
        onSearch={onSearch}
        logout={logout}
        user={user}
        onUploadClick={handleUploadClick}  
      />

      {state.selectedPhoto && (
        <PhotoDetailsModal
          selectedPhoto={state.selectedPhoto}
          closeModal={onClosePhotoDetailsModal}
          favoritePhotos={state.favoritePhotos}
          toggleFavorite={updateToFavPhotoIds}
        />
      )}
      {showUpload && (
        <PhotoUploadForm
          topics={state.topics}
          onClose={() => setShowUpload(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default App;