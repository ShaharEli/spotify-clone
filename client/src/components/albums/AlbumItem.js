import React from 'react'
import "./AlbumItem.css"
function AlbumItem({album}) {
    const name = album.name
    const image =album.cover_img
    const date = album.upload_at.slice(0,10)
    const artist = album.artist
    return (
        <div className="albums">
            <div><img className="albumsImages" src={image} alt="" /></div>
            <div className="albumsName">{name}</div>
            <div>{artist}</div>
            <div className="albumsDate">{date}</div>
        </div>
    )
}

export default AlbumItem
