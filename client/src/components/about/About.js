import React,{useState,useEffect} from 'react'
import "./About.css"
import Header from '../header/Header'
import Button from "@material-ui/core/Button"
import Cookie from "js-cookie"
import AuthApi from "../Aoth/AuthApi"
import Carousel from 'react-elastic-carousel';
import axios from "axios"
import TopSong from '../songs/TopSong'
import TopAlbum from '../albums/TopAlbum'
import TopArtist from '../artists/TopArtist'
import TopPlaylist from '../playlists/TopPlaylist'

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
        Auth.setAuth(false)
    }
    const [songs,setSongs] = useState([])
    const [albums,setAlbums] = useState([])
    const [artists,setArtists] = useState([])
    const [playlists,setPlaylists] = useState([])
    const [loading,setLoading] =useState(true)


      useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get(`/allfavorites/${Auth.email}`)
                data[0].map(song=> {
                    if(song.upload_at===null){
                        song.upload_at=generateTime()
                    } 
                    return song})
                setSongs(data[0])
                data[1].map(album=> {
                    if(album.upload_at===null){
                        album.upload_at=generateTime()
                    } 
                    if(album.created_at===null){
                        album.created_at=generateTime()
                    } 
                    return album})
                setAlbums(data[1])
                data[2].map(artist=> {
                    if(artist.uploaded_at===null){
                        artist.uploaded_at=generateTime()
                    } 
                return artist})
                
                setArtists(data[2])
                data[3].map(playlist=> {
                    if(playlist.uploaded_at===null){
                        playlist.uploaded_at=generateTime()
                } 
                 return playlist})
                 
                setPlaylists(data[3])                   
            }catch(e){console.log(e.message)}
        })()
    }, [Auth.email])
    return (
        <>
        <Header />
        <div id="about">
        <div id="footer">
             <span>  Hi there {Auth.name}</span> &nbsp; &nbsp;
            <Button onClick={logout} variant="contained" color="secondary">Logout</Button>
        </div>
        <h1 style={{textAlign:"center"}}>your songs</h1>
        <Carousel 
               breakPoints={breakPoints}
             itemsToShow={8} itemPadding={[10]}>
            {
            songs.map((song)=>{
            return <TopSong noAdd={true} query={["all_songs",song.id]} key={song.id} song={song} />})
            } 
            </Carousel> 
            <h1 style={{textAlign:"center"}}>your artists</h1>
            <Carousel itemsToShow={8} itemPadding={[10]} breakPoints={breakPoints}>
            {
            artists.map((artist)=><TopArtist noAdd={true} key={artist.id} artist={artist} />)
            } 
            </Carousel> 
             <h1 style={{textAlign:"center"}}>your albums</h1>
             <Carousel itemsToShow={8} itemPadding={[10]} breakPoints={breakPoints}>
            {
            albums.map((album)=><TopAlbum noAdd={true} key={album.id} album={album} />)
            } 
            </Carousel>

            <h1 style={{textAlign:"center"}}>your playlists</h1>
            <Carousel breakPoints={breakPoints} itemsToShow={8} itemPadding={[10]}>
            {
            playlists.map((playlist)=><TopPlaylist noAdd={true} key={playlist.id} playlist={playlist} />)
            } 
            </Carousel>
        </div>
        </>
    )
}

export default About
