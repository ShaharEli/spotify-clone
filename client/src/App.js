import Home from './components/home/Home';
import React, { useState } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import About from './components/about/About';
import Songs from './components/songs/Songs';
import Header from './components/header/Header';
import Albums from './components/albums/Albums';
import Artist from './components/artists/Artist';
import Playlists from './components/playlists/Playlists';
import OneAlbum from './components/albums/OneAlbum';
import OnePlaylist from './components/playlists/OnePlaylist';
import OneArtist from './components/artists/OneArtist';
import AddSong from './components/songs/AddSong';
import NotFound from './NotFound/NotFound';
import OneSong from './components/songs/OneSong';
import Register from './components/Aoth/Register';
import Login from './components/Aoth/Login';

function App() {
    const [auth, setAuth] = useState(false)
    return (
        <>
        <Router>
        <Switch>
          <Route path="/song/:id">
            <Header />
            <OneSong />
          </Route>
        <Route exact path="/addSong">
            <AddSong />
          </Route>
          <Route path="/album/:id">
            <Header />
            <OneAlbum />
          </Route>
          <Route path="/playlist/:id">
            <Header />
            <OnePlaylist />
          </Route>
          <Route path="/artist/:id">
            <Header />
            <OneArtist />
          </Route>
          <Route exact path="/playlists">
            <Header />
            <Playlists  />
        </Route>  
        <Route exact path="/artists">
            <Header />
            <Artist  />
        </Route> 
          <Route exact path="/albums">
            <Header />
            <Albums />
        </Route> 
          <Route exact path="/songs">
            <Header />
            <Songs  />
        </Route> 
          <Route exact  path="/about">
            <About/>
          </Route> 
          <Route exact path="/login">
              <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/">
        <Header animate={true}/>
          <Home />
          </Route>
          <Route path="*">
            <Header />
            <NotFound />
          </Route>
        </Switch>
        </Router>
      </>
    )
}

export default App
