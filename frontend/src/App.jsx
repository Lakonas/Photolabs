import React from 'react';
import PhotoListItem from './components/PhotoListItem';
import './App.scss';

const photos = new Array(3).fill({
  location: {
    city: "Montreal",
    country: "Canada",
  },
}).map((photo, index) => ({
  ...photo,
  id: (index + 1).toString(),
  username: `User ${index + 1}`,
  imageSource: `/Image-${index + 1}-Regular.jpeg`,
  profile: `/profile-${index + 1}.jpg`,
}));

const App = () => (
  <div className="App">
    {photos.map(photo => (
      <PhotoListItem key={photo.id} photo={photo} />
    ))}
  </div>
);

export default App;




