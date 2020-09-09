import React from 'react'
import "./ArtistItem.css"
function ArtistItem({artist}) {
    const name = artist.name
    const image =artist.cover_img
    const date = artist.uploaded_at.slice(0,10)
    return (
        <div className="artists">
            <div><img className="artistsImages" src={image} alt="" /></div>
            <div className="artistsName">{name}</div>
            <div className="artistsDate">{date}</div>
        </div>
    )
}

export default ArtistItem
