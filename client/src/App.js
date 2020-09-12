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
      <div   data-aos={window.window.innerWidth<650&&"fade-up-right"} className="section">
      <TopPlaylists />
      </div>
      <div data-aos={window.window.innerWidth<650&&"fade-up-left"} className="section">
      <TopAlbums />
      </div>
    </div>
    </>
  );
}

export default App;





