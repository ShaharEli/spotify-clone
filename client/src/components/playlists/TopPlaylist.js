import React from 'react'
import "./PlaylistItem.css"
import { Link } from 'react-router-dom'

function TopPlaylist({playlist}) {
    const name = playlist.name
    const image =playlist.cover_img
    const date = playlist.uploaded_at.slice(0,10)
    return (
        <div className="topPlaylists">
          <span className="addSong" title="add to your playlists" >+</span>

            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/playlist/${playlist.id}`}>
            {name}
            <div><img className="topImages" src={image} alt="" /></div>
            </Link>
            <div className="playlistsDate">{date}</div>
        </div>
    )
}

export default TopPlaylist
