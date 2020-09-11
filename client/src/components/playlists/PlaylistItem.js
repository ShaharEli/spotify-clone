import React from 'react'
import "./PlaylistItem.css"
import { Link } from 'react-router-dom'
function PlaylistItem({playlist}) {
    const name = playlist.name
    const image =playlist.cover_img
    const date = playlist.uploaded_at.slice(0,10)
    return (
        <div className="playlists">
            <div><img className="playlistsImages" src={image} alt="" /></div>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/playlist/${playlist.id}`}>
            <div className="playlistsName">{name}</div>
            </Link>
            <div className="playlistsDate">{date}</div>
        </div>
    )
}

export default PlaylistItem
