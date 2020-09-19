import Home from './components/home/Home';
import React, { useEffect, useState } from 'react';
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
import Cookie from "js-cookie"
import Swal from "sweetalert2"



function App() {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const getAutorizied = async ()=>{
        const isAuth = await Cookie.get("auth")
        if (isAuth==="true"){
          try{
            const authEmail =await  Cookie.get("email")
            const authName = await  Cookie.get("name")
            // Swal.fire("Welcome back",`${authName}`,"success")  
            setAuth(true)  
            setEmail(authEmail)
            setName(authName) 
          }
          catch(e){}
        }
    }
    useEffect(()=>{
     getAutorizied()
    },[])  
    return (
        <>
        <AuthApi.Provider value={{auth, setAuth,name,setName, email,setEmail}}>
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
                  <Route email={email} name={name} exact path="/login" component={Login}/>
                  <Route email={email} name={name} exact path="/register" component={Register}/>
                  <Route email={email} name={name} path="/song/:id" component={OneSong}/>
                  <Route email={email} name={name} exact path="/addSong" component={AddSong} />
                  <Route email={email} name={name} path="/album/:id" component={OneAlbum} />
                  <Route email={email} name={name} path="/playlist/:id" component={OnePlaylist}/>
                  <Route email={email} name={name} path="/artist/:id" component={OneArtist}/>
                  <Route email={email} name={name} exact path="/playlists" component={Playlists}/>
                  <Route email={email} name={name} exact path="/artists" component={Artist}/>
                  <Route email={email} name={name} exact path="/albums" component={Albums}/>
                  <Route email={email} name={name} exact path="/songs" component={Songs} />
                  <Route email={email} name={name} exact  path="/about" component={About}/>
                  <Route email={email} name={name} exact path="/" component={Home}/>
                  <Route email={email} name={name} path="*"  component={NotFound} />
                 </Switch>
            </>
         }
         
        </Router>
        </AuthApi.Provider>
      </>
    )
}



 
export default App