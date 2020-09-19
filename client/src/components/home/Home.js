import React from 'react';
import './Home.css';
import TopSongs from '../songs/TopSongs';
import TopAlbums from '../albums/TopAlbums';
import TopPlaylists from '../playlists/TopPlaylists';
import TopArtists from '../artists/TopArtists';
import Header from '../header/Header';
import AuthApi from "../Aoth/AuthApi"
import Swal from "sweetalert2"
function Home() {
  const Auth = React.useContext(AuthApi)
  return (
    <>
    <Header animate={true}/>
    <div className="home">
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

export default Home;





