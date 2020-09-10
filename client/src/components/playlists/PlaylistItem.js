import React from 'react'
import "./PlaylistItem.css"
function PlaylistItem({playlist}) {
    const name = playlist.name
    const image =playlist.cover_img
    const date = playlist.uploaded_at.slice(0,10)
    return (
        <div className="playlists">
            <div><img className="playlistsImages" src={image} alt="" /></div>
            <div className="playlistsName">{name}</div>
            <div className="playlistsDate">{date}</div>
        </div>
    )
}

export default PlaylistItem
