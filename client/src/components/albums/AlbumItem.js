import React from 'react'
import "./AlbumItem.css"
import { Link } from 'react-router-dom'
function AlbumItem({album}) {
    const name = album.name
    const image =album.cover_img
    const date = album.upload_at.slice(0,10)
    const artist = album.artist
    return (
        <div className="albums">
            <div><img className="albumsImages" src={image} alt="" /></div>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/album/${album.id}`}>
            <div className="albumsName">{name}</div>
            </Link>
            <div>{artist}</div>
            <div className="albumsDate">{date}</div>
        </div>
    )
}

export default AlbumItem
