import React from 'react';
import './App.css';
import TopSongs from './components/songs/TopSongs';
import TopAlbums from './components/albums/TopAlbums';
import TopPlaylists from './components/playlists/TopPlaylists';
import TopArtists from './components/artists/TopArtists';
function App() {

  return (
    <>
    <div className="App">
      <div className="section" >
      <TopSongs />
      </div>
      <div  className="section">
      <TopArtists />
      </div>
      <div    className="section">
      <TopPlaylists />
      </div>
      <div  className="section">
      <TopAlbums />
      </div>
    </div>
    </>
  );
}

export default App;





