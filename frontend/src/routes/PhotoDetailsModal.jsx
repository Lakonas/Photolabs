import React from 'react';
import '../styles/PhotoDetailsModal.scss';
import closeSymbol from '../assets/closeSymbol.svg';

const PhotoDetailsModal = ({ selectedPhoto, closeModal }) => { 
  if (!selectedPhoto) return null; // If no photo is selected, don't render the modal

  return (
    <div className="photo-details-modal-overlay">
      <div className="photo-details-modal">
        
        {/* Close button */}
        <button className="photo-details-modal__close-button" onClick={closeModal}>
          <img src={closeSymbol} alt="Close modal" />
        </button>

        <div className="photo-details-modal__images">
          <img
            className="photo-details-modal__image"
            src={selectedPhoto.urls.full}
            alt={`Photo by ${selectedPhoto.user.name}`}
          />
        </div>
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
