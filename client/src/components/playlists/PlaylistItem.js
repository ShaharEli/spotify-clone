import React,{useContext} from 'react'
import "./PlaylistItem.css"
import { Link } from 'react-router-dom'
import AuthApi from "../Aoth/AuthApi"
import axios from 'axios';

function PlaylistItem({playlist}) {
    const Auth = useContext(AuthApi)
    const name = playlist.name
    const image =playlist.cover_img
    const date = playlist.uploaded_at.slice(0,10)
    const addPlaylist = async()=>{
        await axios.post("/yourplaylists",{email:Auth.email,playlist_id:playlist.id})
    }
    return (
        <div className="playlists">
          <span onClick={addPlaylist} className="addSong" title="add to your playlists" >+</span>
            <div><img className="playlistsImages" src={image} alt="" /></div>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/playlist/${playlist.id}`}>
            <div className="playlistsName">{name}</div>
            </Link>
            <div className="playlistsDate">{date}</div>
        </div>
    )
}

export default PlaylistItem
