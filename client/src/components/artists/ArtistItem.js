import React,{useContext} from 'react'
import "./ArtistItem.css"
import { Link } from 'react-router-dom'
import AuthApi from "../Aoth/AuthApi"
import axios from 'axios';
import { Tooltip } from '@material-ui/core';

function ArtistItem({artist}) {
    const Auth = useContext(AuthApi)
    const name = artist.name
    const image =artist.cover_img
    const date = artist.uploaded_at.slice(0,10)
    const addArtist = async()=>{
        await axios.post("/yourartists",{email:Auth.email,artist_id:artist.id})
    }
    return (
        <div className="artists">
            <Tooltip title="add to your artists">
            <span onClick={addArtist} className="addSong"  >+</span>
            </Tooltip>
            <div><img className="artistsImages" src={image} alt="" /></div>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/artist/${artist.id}`}>
            <div className="artistsName">{name}</div>
            </Link>
            <div className="artistsDate">{date}</div>
        </div>
    )
}

export default ArtistItem
