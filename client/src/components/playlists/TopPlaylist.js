import React, { useContext } from 'react'
import "./PlaylistItem.css"
import { Link } from 'react-router-dom'
import AuthApi from "../Aoth/AuthApi"
import axios from 'axios';

function TopPlaylist({playlist,noAdd}) {
    const Auth = useContext(AuthApi)
    const name = playlist.name
    const image =playlist.cover_img
    const date = playlist.uploaded_at.slice(0,10)
    const addPlaylist = async()=>{
        await axios.post("/yourplaylists",{email:Auth.email,playlist_id:playlist.id})
    }
    return (
        <div className="topPlaylists">
            {
            !noAdd&&
            <span onClick={addPlaylist} className="addSong" title="add to your playlists" >+</span>
            }
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/playlist/${playlist.id}`}>
            {name}
            <div><img className="topImages" src={image} alt="" /></div>
            </Link>
            <div className="playlistsDate">{date}</div>
        </div>
    )
}

export default TopPlaylist
