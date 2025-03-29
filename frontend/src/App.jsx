import React from 'react';
import PhotoListItem from './components/PhotoListItem';
import './App.scss';

const sampleDataForPhotoListItem = {
  id: "1",
  location: {
    city: "Montreal",
    country: "Canada",
  },
  imageSource: "/Image-1-Regular.jpeg",  // Ensure the image is in the public/ folder
  username: "Joe Example",
  profile: "/profile-1.jpg",  // Ensure the profile image is in the public/ folder
};

const App = () => (
  <div className="App">
    <PhotoListItem photo={sampleDataForPhotoListItem} />
  </div>
);

export default App;



