import { useEffect, useReducer } from 'react';
import axios from 'axios';

export const ACTIONS = {
  FAV_PHOTO_ADDED: 'FAV_PHOTO_ADDED',
  FAV_PHOTO_REMOVED: 'FAV_PHOTO_REMOVED',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA',
  SELECT_PHOTO: 'SELECT_PHOTO',
  DISPLAY_PHOTO_DETAILS: 'DISPLAY_PHOTO_DETAILS'
};

const initialState = {
  favoritePhotos: [],
  selectedPhoto: null,
  photos: [],     // ✅ These are already in your state
  topics: []      // ✅ These too
};

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

  useEffect(() => {
    // Fetch PHOTOS
    axios.get('/api/photos')
      .then((response) => {
        console.log("Fetched photo data:", response.data);
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photos: response.data } });
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });

    // Fetch TOPICS
    axios.get('/api/topics')
      .then((response) => {
        dispatch({ type: ACTIONS.SET_TOPIC_DATA, payload: { topics: response.data } });
      })
      .catch((error) => {
        console.error('Error fetching topics:', error);
      });
  }, []);

  const updateToFavPhotoIds = (photoId) => {
    const isFav = state.favoritePhotos.includes(photoId);
    dispatch({
      type: isFav ? ACTIONS.FAV_PHOTO_REMOVED : ACTIONS.FAV_PHOTO_ADDED,
      payload: { id: photoId }
    });
  };

  const onPhotoSelect = (photo) => {
    dispatch({ type: ACTIONS.SELECT_PHOTO, payload: { photo } });
  };

  const onClosePhotoDetailsModal = () => {
    dispatch({ type: ACTIONS.DISPLAY_PHOTO_DETAILS });
  };
 
  return {
    state,
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal
  };
};

export default useApplicationData;
