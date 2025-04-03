import React from 'react';
import '../styles/PhotoDetailsModal.scss';
import closeSymbol from '../assets/closeSymbol.svg';
import PhotoList from '../components/PhotoList'; // Import PhotoList
import PhotoFavButton from '../components/PhotoFavButton'; // Import PhotoFavButton

const PhotoDetailsModal = ({ selectedPhoto, closeModal, favoritePhotos, toggleFavorite }) => { 
  if (!selectedPhoto) return null; // If no photo is selected, don't render the modal
  console.log("Similar Photos Data:", selectedPhoto.similar_photos, Array.isArray(selectedPhoto.similar_photos));

  const isFavorited = (favoritePhotos || []).includes(selectedPhoto.id);

  return (
    <div className="photo-details-modal-overlay">
      <div className="photo-details-modal">
        
        {/* Close button */}
        <button className="photo-details-modal__close-button" onClick={closeModal}>
          <img src={closeSymbol} alt="Close modal" />
        </button>

        <div className="photo-details-modal__images">
          {/* Main Photo */}
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
          
          {/* Similar Photos Section */}
          <div className="photo-details-modal__similar-photos">
            {/* Use PhotoList to render similar photos */}
            <PhotoList 
              photos={Object.values(selectedPhoto.similar_photos)} // Convert object to array
              favoritePhotos={favoritePhotos}
              toggleFavorite={toggleFavorite}
              openModal={() => {}} // No-op function for similar photos in the modal
            />
          </div>
        </div>

        {/* Photographer Details for Main Photo */}
        <div className="photo-details-modal__photographer-details">
          <div className="photo-details-modal__photographer-info">
            <img
              className="photo-details-modal__photographer-profile"
              src={selectedPhoto.user.profile}
              alt={`${selectedPhoto.user.name}'s profile`}
            />
            <div className="photo-details-modal__photographer-location">
              {selectedPhoto.user.name} - {selectedPhoto.location.city}, {selectedPhoto.location.country}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsModal;