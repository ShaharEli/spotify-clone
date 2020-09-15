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
    <h2>Top songs</h2>
      <div className="section" >
      <TopSongs />
      </div>      
    <h2>Top Artists</h2>
      <div  className="section">
      <TopArtists />
      </div>
    <h2>Top Playlists</h2>
      <div    className="section">
      <TopPlaylists />
      </div>
    <h2>Top Albums</h2>

      <div  className="section">
      <TopAlbums />
      </div>
    </div>
    </>
  );
}

export default App;





