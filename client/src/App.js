import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Liked from './components/liked/Liked';
import Artist from './components/artists/Artist';
import Playlists from './components/playlists/Playlists';
import Albums from './components/albums/Albums';
// list of most, artists, playlists, albums
function App() {
  return (
    <>
    <Header />
    <div className="App">
      <Liked />
      <Artist />
      <Playlists />
      <Albums />
     
    </div>
    </>
  );
}

export default App;
