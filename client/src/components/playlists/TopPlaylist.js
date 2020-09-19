import React, { useContext } from 'react'
import "./PlaylistItem.css"
import { Link } from 'react-router-dom'
import AuthApi from "../Aoth/AuthApi"
import axios from 'axios';
import { Tooltip } from '@material-ui/core';

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
            <Tooltip  title="add to your playlists">
            <span onClick={addPlaylist} className="addSong" >+</span>
            </Tooltip>
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
