import React, { useState } from 'react';
import HomeRoute from './routes/HomeRoute';
import PhotoDetailsModal from './routes/PhotoDetailsModal';
import useApplicationData from './hooks/useApplicationData';
import useAuth from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const {
    state,
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal,
    fetchPhotosByTopic,
    onSearch
  } = useApplicationData();

  const { user, loading, logout, login, register } = useAuth();  // ← ADDED: login, register
  const [showRegister, setShowRegister] = useState(false);

  console.log('🟣 App rendered! user:', user, 'loading:', loading); 

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
        register={register}  // ← ADDED: pass register prop
      />
    ) : (
      <LoginForm 
        onSwitchToRegister={() => setShowRegister(true)}
        login={login}  // ← ADDED: pass login prop
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