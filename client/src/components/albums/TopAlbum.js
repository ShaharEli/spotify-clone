import React from 'react'
import "./AlbumItem.css"
import { Link } from 'react-router-dom'


function TopAlbum({album}) {
    const name = album.name
    const image =album.cover_img
    const date = album.upload_at.slice(0,10)
    const artist = album.artist
    return (
        <div className="topAlbum">
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/album/${album.id}`}>
            <div className="albumsName">{name}</div>
            
            <div><img className="topImages" src={image} alt="" /></div>
            </Link>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/artist/${album.artist_id}`}>
            <div>{artist}</div>
            </Link>
            <div className="albumsDate">{date}</div>
        </div>
    )
}

export default TopAlbum