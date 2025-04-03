import React from 'react';
import '../styles/PhotoDetailsModal.scss';
import closeSymbol from '../assets/closeSymbol.svg';
import PhotoList from '../components/PhotoList'; // Import PhotoList

const PhotoDetailsModal = ({ selectedPhoto, closeModal }) => { 
  if (!selectedPhoto) return null; // If no photo is selected, don't render the modal
  console.log("Similar Photos Data:", selectedPhoto.similar_photos, Array.isArray(selectedPhoto.similar_photos));

  return (
    <div className="photo-details-modal-overlay">
      <div className="photo-details-modal">
        
        {/* Close button */}
        <button className="photo-details-modal__close-button" onClick={closeModal}>
          <img src={closeSymbol} alt="Close modal" />
        </button>

        <div className="photo-details-modal__images">
          {/* Main Photo */}
          <img
            className="photo-details-modal__image"
            src={selectedPhoto.urls.full}
            alt={`Photo by ${selectedPhoto.user.name}`}
          />

          {/* Similar Photos Section */}
          <div className="photo-details-modal__similar-photos">
            {/* Use PhotoList to render similar photos */}
            <PhotoList 
              photos={Object.values(selectedPhoto.similar_photos)} // Convert object to array
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
