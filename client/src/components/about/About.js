import React,{useState,useEffect} from 'react'
import "./About.css"
import Button from "@material-ui/core/Button"
import Cookie from "js-cookie"
import AuthApi from "../Aoth/AuthApi"
import Carousel from 'react-elastic-carousel';
import axios from "axios"
import TopSong from '../songs/TopSong'
import TopAlbum from '../albums/TopAlbum'
import TopArtist from '../artists/TopArtist'
import TopPlaylist from '../playlists/TopPlaylist'
import {motion} from 'framer-motion'

function generateTime() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return `${today}`;
  }
  const breakPoints = [
    { width: 270, itemsToShow: 2 },
    { width: 371, itemsToShow: 3 },
    { width: 485, itemsToShow: 4 },
    { width: 565, itemsToShow: 5 },
    { width:630 , itemsToShow: 6 },
    { width:730 , itemsToShow: 7 },
    { width: 950, itemsToShow: 8 },
  ]

function About() {
    const Auth = React.useContext(AuthApi)
    const logout =async ()=>{
        await  Cookie.remove("email")
        await  Cookie.remove("name")
        await Cookie.remove("auth")
        await Cookie.remove("token")
        Auth.setAuth(false)
    }
    const [songs,setSongs] = useState([])
    const [albums,setAlbums] = useState([])
    const [artists,setArtists] = useState([])
    const [playlists,setPlaylists] = useState([])


      useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get(`/favorites/all/${Auth.email}`,{headers:{
                    token:Cookie.get("token")
                }})
                let songsList = []
                for (let i=0;i<data[0].length;i++){
                    if (songsList.find(element=>element.id===data[0][i].id)){
                        continue
                    }
                    if(data[0][i].uploadAt===null){
                        data[0][i].uploadAt=generateTime()
                    } 
                    songsList.push(data[0][i])        
                }
                setSongs(songsList)
                let albumsList = []
                for (let i=0;i<data[1].length;i++){
                    if (albumsList.find(element=>element.id===data[1][i].id)){
                        continue
                    }
                    if(data[1][i].uploadAt===null){
                        data[1][i].uploadAt=generateTime()
                    } 
                    if(data[1][i].createdAt===null){
                        data[1][i].createdAt=generateTime()
                    } 
                    albumsList.push(data[1][i])        
                }
                setAlbums(albumsList)
                let artistsList = []
                for (let i=0;i<data[2].length;i++){
                    if (artistsList.find(element=>element.id===data[2][i].id)){
                        continue
                    }
                    if(data[2][i].uploadedAt===null){
                        data[2][i].uploadedAt=generateTime()
                    } 
                    artistsList.push(data[2][i])        
                }
                setArtists(artistsList)
                let playlistsList = []
                for (let i=0;i<data[3].length;i++){
                    if (playlistsList.find(element=>element.id===data[3][i].id)){
                        continue
                    }
                    if(data[3][i].uploadedAt===null){
                        data[3][i].uploadedAt=generateTime()
                    } 
                    playlistsList.push(data[3][i])        
                }               
                setPlaylists(playlistsList)                   
            }catch(e){console.log(e.message)}
        })()
    }, [Auth.email])
    return (
        <>
        <div id="about"
        >
        <div id="userInfo">
             <span style={{marginLeft:50}}>  Hi there {Auth.name}</span> &nbsp; &nbsp;
            <Button style={{marginRight:20}} onClick={logout} variant="contained" color="secondary">Logout</Button>
        </div>
        <motion.div id="userFavorites"
                initial={{opacity:0,scale:0.5}}
                animate={{opacity:1,scale:1}}
                 transition={{
                 default: { duration: 1 },
                    }} >
             {
            songs.length>0?
            <>
            <h1 style={{textAlign:"center"}}>your songs</h1>
             <Carousel 
               breakPoints={breakPoints}
             itemsToShow={8} itemPadding={[10]}>
            {
            songs.map((song)=>{
            return <TopSong noAdd={true} query={["favorites","true"]} key={song.id+Math.random()} song={song} />})
            } 
            </Carousel> 
            </>:
            <h1 style={{textAlign:"center",marginBottom:150}}>Waiting for some songs...</h1>
             }
             {
            artists.length>0?
            <>
            <h1 style={{textAlign:"center"}}>your artists</h1>
            <Carousel itemsToShow={8} itemPadding={[10]} breakPoints={breakPoints}>
            {
            artists.map((artist)=><TopArtist noAdd={true} key={artist.id+Math.random()} artist={artist} />)
            } 
            </Carousel> 
            </>
            :
            <h1 style={{textAlign:"center",marginBottom:150}}>Waiting for some artists...</h1>
            }
            {
            albums.length>0?
            <>
             <h1 style={{textAlign:"center"}}>your albums</h1>
             <Carousel itemsToShow={8} itemPadding={[10]} breakPoints={breakPoints}>
            {
            albums.map((album)=><TopAlbum noAdd={true} key={album.id+Math.random()} album={album} />)
            } 
            </Carousel>
            </>
            :
            <h1 style={{textAlign:"center",marginBottom:150}}>Waiting for some albums...</h1>
            }
            {
            playlists.length>0?
            <>
            <h1 style={{textAlign:"center"}}>your playlists</h1>
            <Carousel breakPoints={breakPoints} itemsToShow={8} itemPadding={[10]}>
            {
            playlists.map((playlist)=><TopPlaylist noAdd={true} key={playlist.id+Math.random()} playlist={playlist} />)
            } 
            </Carousel>
            </>
            :
            <h1 style={{textAlign:"center",marginBottom:150}}>Waiting for some playlists...</h1>
            }
            </motion.div>
        </div>
        </>
    )
}

export default About
