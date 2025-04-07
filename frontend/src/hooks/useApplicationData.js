import { useState } from 'react';

const useApplicationData = () => {
  // App-level state
  const [favoritePhotos, setFavoritePhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Toggle favorite photo
  const updateToFavPhotoIds = (photoId) => {
    setFavoritePhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  // When user clicks a photo
  const onPhotoSelect = (photo) => {
    setSelectedPhoto(photo);
  };

  // When user closes the modal
  const onClosePhotoDetailsModal = () => {
    setSelectedPhoto(null);
  };

  // Return state + action functions
  return {
    state: {
      favoritePhotos,
      selectedPhoto
    },
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal
  };
};

export default useApplicationData;
