import Home from './components/home/Home';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom";
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
import Loading from './components/loading/Loading';
import axios from "axios"


function App() {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading,setLoading] = useState(true)
    const getAutorizied = async ()=>{
        const isAuth = await Cookie.get("auth")
        const authEmail =await  Cookie.get("email")
        const authName = await  Cookie.get("name")
        const ok= await axios.get(`/checkmail/${authEmail}`)
        const token = await Cookie.get("token")
        if (isAuth==="true" && ok.data.token===token && !ok.data.emailOk && ok.data.name===authName){
          try{
            Swal.fire("Welcome back",`${authName}`,"success")  
            setAuth(true)  
            setEmail(authEmail)
            setName(authName) 
          }
          catch(e){}
        }
    }
    useEffect(async ()=>{
     await getAutorizied()
     setLoading(false)
    },[])  
    return (
        <>
        <AuthApi.Provider value={{auth, setAuth,name,setName, email,setEmail}}>
       <Router>
         {
             !auth? 
             !loading?
             <>
             <Switch>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/register" component={Register}/>
             <Route path="/" component={Login} />
            </Switch>
            </>
            :
            <Loading />
            : 
                <Switch>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/register" component={Register}/>
                  <Route path="/song/:id" component={OneSong}/>
                  <Route exact path="/addSong" component={AddSong} />
                  <Route path="/album/:id" component={OneAlbum} />
                  <Route path="/playlist/:id" component={OnePlaylist}/>
                  <Route path="/artist/:id" component={OneArtist}/>
                  <Route exact path="/playlists" component={Playlists}/>
                  <Route exact path="/artists" component={Artist}/>
                  <Route exact path="/albums" component={Albums}/>
                  <Route exact path="/songs" component={Songs} />
                  <Route exact  path="/about" component={About}/>
                  <Route exact path="/" component={Home}/>
                  <Route path="*"  component={NotFound} />
                 </Switch>
         }
         
        </Router>
        </AuthApi.Provider>
      </>
    )
}



 
export default App