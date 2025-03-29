import React from 'react';
import PhotoListItem from './components/PhotoListItem';
import './App.scss';

const sampleDataForPhotoListItem = {
  location: {
    city: "Montreal",
    country: "Canada",
  },
  imageSource: "/Image-1-Regular.jpeg",
  username: "Joe Example",
  profile: "/profile-1.jpg",
};

const App = () => {
  const photos = [
    { ...sampleDataForPhotoListItem, id: "1", username: "Joe Example", imageSource: "/Image-1-Regular.jpeg" },
    { ...sampleDataForPhotoListItem, id: "2", username: "Jane Example", imageSource: "/Image-2-Regular.jpeg" },
    { ...sampleDataForPhotoListItem, id: "3", username: "John Example", imageSource: "/Image-3-Regular.jpeg" }
  ];

  return (
    <div className="App">
      {photos.map((photo) => (
        <PhotoListItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default App;
