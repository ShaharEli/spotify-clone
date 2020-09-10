import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import About from './components/about/About';
import Songs from './components/songs/Songs';
import Header from './components/header/Header';
import Albums from './components/albums/Albums';
import Artist from './components/artists/Artist';
import Playlists from './components/playlists/Playlists';

ReactDOM.render(
    <>
    <Router>
    <Switch>
      {/* <Route path="/sign">
        <Sign/>
</Route> */}
      <Route path="/playlists">
        <Header />
        <Playlists />
    </Route> 
    <Route path="/artists">
        <Header />
        <Artist />
    </Route> 
      <Route path="/albums">
        <Header />
        <Albums />
    </Route> 
      <Route path="/songs">
        <Header />
        <Songs />
    </Route> 
      <Route path="/about">
        <About/>
      </Route> 
      <Route path="/">
      <App />
      </Route>
    </Switch>
    </Router>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
