import { useEffect, useReducer } from 'react';
import axios from 'axios';

// Action types for reducer
export const ACTIONS = {
  FAV_PHOTO_ADDED: 'FAV_PHOTO_ADDED',
  FAV_PHOTO_REMOVED: 'FAV_PHOTO_REMOVED',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA',
  SELECT_PHOTO: 'SELECT_PHOTO',
  DISPLAY_PHOTO_DETAILS: 'DISPLAY_PHOTO_DETAILS'
};

// Initial global state
const initialState = {
  favoritePhotos: [],
  selectedPhoto: null,
  photos: [],
  topics: []
};

// Reducer handles all state transitions
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FAV_PHOTO_ADDED:
      return {
        ...state,
        favoritePhotos: [...state.favoritePhotos, action.payload.id]
      };

    case ACTIONS.FAV_PHOTO_REMOVED:
      return {
        ...state,
        favoritePhotos: state.favoritePhotos.filter(id => id !== action.payload.id)
      };

    case ACTIONS.SELECT_PHOTO:
      return {
        ...state,
        selectedPhoto: action.payload.photo
      };

    case ACTIONS.DISPLAY_PHOTO_DETAILS:
      return {
        ...state,
        selectedPhoto: null
      };

    case ACTIONS.SET_PHOTO_DATA:
      return {
        ...state,
        photos: action.payload.photos
      };

    case ACTIONS.SET_TOPIC_DATA:
      return {
        ...state,
        topics: action.payload.topics
      };

    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch photos and topics when app first loads
  useEffect(() => {
    axios.get('/api/photos')
      .then((response) => {
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photos: response.data } });
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });

    axios.get('/api/topics')
      .then((response) => {
        dispatch({ type: ACTIONS.SET_TOPIC_DATA, payload: { topics: response.data } });
      })
      .catch((error) => {
        console.error('Error fetching topics:', error);
      });
  }, []);

  // Toggle photo as favorite or unfavorite
  const updateToFavPhotoIds = (photoId) => {
    const isFav = state.favoritePhotos.includes(photoId);
    dispatch({
      type: isFav ? ACTIONS.FAV_PHOTO_REMOVED : ACTIONS.FAV_PHOTO_ADDED,
      payload: { id: photoId }
    });
  };

  // Open modal with selected photo
  const onPhotoSelect = (photo) => {
    dispatch({ type: ACTIONS.SELECT_PHOTO, payload: { photo } });
  };

  // Close modal
  const onClosePhotoDetailsModal = () => {
    dispatch({ type: ACTIONS.DISPLAY_PHOTO_DETAILS });
  };

  // Fetch photos for a specific topic
  const fetchPhotosByTopic = (topicId) => {
    axios.get(`/api/topics/${topicId}/photos`)
      .then((res) => {
        dispatch({
          type: ACTIONS.SET_PHOTO_DATA,
          payload: { photos: res.data }
        });
      })
      .catch((err) => {
        console.error("Failed to fetch topic photos:", err);
      });
  };

  //Search photos by city or country
  const onSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      // If search is empty, fetch all photos
      axios.get('/api/photos')
        .then((response) => {
          dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photos: response.data } });
        });
    } else {
      // If search has text, call search endpoint
      axios.get('/api/photos/search', {
        params: { q: searchTerm }
      })
        .then((response) => {
          dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photos: response.data } });
        })
        .catch((error) => {
          console.error('Error searching photos:', error);
        });
    }
  };

  return {
    state,
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal,
    fetchPhotosByTopic,
    onSearch
  };
};

export default useApplicationData;
