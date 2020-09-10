import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Songs from './components/songs/Songs';
import Artist from './components/artists/Artist';
import Playlists from './components/playlists/Playlists';
import Albums from './components/albums/Albums';
function App() {
  return (
    <>
    <Header />
    <div className="App">
      <div className="section" >
      <Songs />
      </div>
      <div className="section">
      <Artist />
      </div>
      <div className="section">
      <Playlists />
      </div>
      <div className="section">
      <Albums />
      </div>
    </div>
    </>
  );
}

export default App;





