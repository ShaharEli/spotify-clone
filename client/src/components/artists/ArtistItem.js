import React from 'react'
import "./ArtistItem.css"
import { Link } from 'react-router-dom'
function ArtistItem({artist}) {
    const name = artist.name
    const image =artist.cover_img
    const date = artist.uploaded_at.slice(0,10)
    return (
        <div className="artists">
          <span className="addSong" title="add to your artists" >+</span>
            <div><img className="artistsImages" src={image} alt="" /></div>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/artist/${artist.id}`}>
            <div className="artistsName">{name}</div>
            </Link>
            <div className="artistsDate">{date}</div>
        </div>
    )
}

export default ArtistItem
