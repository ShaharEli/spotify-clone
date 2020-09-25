import React,{useContext} from 'react'
import "./ArtistItem.css"
import { Link } from 'react-router-dom'
import AuthApi from "../Aoth/AuthApi"
import axios from 'axios';
import { Tooltip } from '@material-ui/core';
import Cookie from "js-cookie"
function ArtistItem({artist}) {
    const Auth = useContext(AuthApi)
    const name = artist.name
    const image =artist.coverImg
    const date = artist.createdAt.slice(0,10)
    const addArtist = async()=>{
        await axios.post("/favorites/artist",{email:Auth.email,artistId:artist.id},{headers:{
            token:Cookie.get("token")
        }})
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
