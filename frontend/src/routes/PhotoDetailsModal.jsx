import React from 'react';
import '../styles/PhotoDetailsModal.scss';
import closeSymbol from '../assets/closeSymbol.svg';
import PhotoList from '../components/PhotoList';
import PhotoFavButton from '../components/PhotoFavButton';

// Modal that displays details for the selected photo, including similar photos
const PhotoDetailsModal = ({ selectedPhoto, closeModal, favoritePhotos, toggleFavorite }) => {
  if (!selectedPhoto) return null; // Don't render if there's no selected photo

  const isFavorited = (favoritePhotos || []).includes(selectedPhoto.id);

  return (
    <div className="photo-details-modal-overlay">
      <div className="photo-details-modal">
        {/* Close button */}
        <button className="photo-details-modal__close-button" onClick={closeModal}>
          <img src={closeSymbol} alt="Close modal" />
        </button>

        <div className="photo-details-modal__images">
          {/* Main photo section */}
          <div className="photo-details-modal__main-photo-container">
            <div className="photo-details-modal__image">
              <PhotoFavButton
                isFavorited={isFavorited}
                toggleFavorite={() => toggleFavorite(selectedPhoto.id)}
              />
              <img
                src={selectedPhoto.urls.full}
                alt={`Photo by ${selectedPhoto.user.name}`}
              />
            </div>

            {/* Photographer info */}
            <div className="photo-details-modal__photographer-inline">
              <img
                className="photo-details-modal__photographer-profile"
                src={selectedPhoto.user.profile}
                alt={`${selectedPhoto.user.name}'s profile`}
              />
              <div className="photo-details-modal__photographer-info">
                <div className="photo-details-modal__photographer-name">
                  {selectedPhoto.user.name}
                </div>
                <div className="photo-details-modal__photographer-location">
                  {selectedPhoto.location.city}, {selectedPhoto.location.country}
                </div>
              </div>
            </div>

            {/* Photo title (if available) */}
            {selectedPhoto.title && (
              <div className="photo-details-modal__title">
                {selectedPhoto.title}
              </div>
            )}

            {/* Photo description (if available) */}
            {selectedPhoto.description && (
              <div className="photo-details-modal__description">
                {selectedPhoto.description}
              </div>
            )}
          </div>

          {/* Similar photos section */}
          <h3 className="photo-details-modal__header">Similar Photos</h3>
          <div className="photo-details-modal__similar-photos">
            <PhotoList
              photos={Object.values(selectedPhoto.similar_photos)}
              favoritePhotos={favoritePhotos}
              toggleFavorite={toggleFavorite}
              openModal={() => {}} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsModal;