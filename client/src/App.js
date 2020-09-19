import Home from './components/home/Home';
import React, { useState } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import About from './components/about/About';
import Songs from './components/songs/Songs';
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
import AuthApi from "./components/Aoth/AuthApi"




function App() {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState("")
    return (
        <>
        <AuthApi.Provider value={{auth, setAuth,name,setName}}>
       <Router>
         {
             !auth? 
             <>
             <Switch>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/register" component={Register}/>
             <Route path="/" component={Login} />
            </Switch>
            </>
            : 
            <>
                <Switch>
                  <Route name={name} exact path="/login" component={Login}/>
                  <Route name={name} exact path="/register" component={Register}/>
                  <Route name={name} path="/song/:id" component={OneSong}/>
                  <Route name={name} exact path="/addSong" component={AddSong} />
                  <Route name={name} path="/album/:id" component={OneAlbum} />
                  <Route name={name} path="/playlist/:id" component={OnePlaylist}/>
                  <Route name={name} path="/artist/:id" component={OneArtist}/>
                  <Route name={name} exact path="/playlists" component={Playlists}/>
                  <Route name={name} exact path="/artists" component={Artist}/>
                  <Route name={name} exact path="/albums" component={Albums}/>
                  <Route name={name} exact path="/songs" component={Songs} />
                  <Route name={name} exact  path="/about" component={About}/>
                  <Route name={name} exact path="/" component={Home}/>
                  <Route name={name} path="*"  component={NotFound} />
                 </Switch>
            </>
         }
         
        </Router>
        </AuthApi.Provider>
      </>
    )
}



 
export default App