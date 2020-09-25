import React,{useEffect, useState} from 'react'
import "./Artist.css"
import axios from 'axios'
import ArtistItem from "./ArtistItem"
import TextField from '@material-ui/core/TextField';
import {motion} from 'framer-motion'
import Cookie from "js-cookie"
function Artist() {
    const [artists,setArtists] =useState([])
    const [unfilteredArtists,setUnfilteredArtists] =useState([])

    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get("/artists",{headers:{
                    token:Cookie.get("token")
                }})
                setArtists(data)
                setUnfilteredArtists(data)
            }catch(e){console.error(e.message)}

        })()
    }, [])
    const handleChange=(e)=>{
        setArtists(unfilteredArtists.filter(artist=>{
             return artist.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }
    return (
        <>
        <div id="artists" >
            <div style={{width:"80%"}}>
            <div className="searchDiv">
            <TextField style={{marginTop: 10,textAlign:"center" }}  id="searchInput" autoComplete="off" label="Search artist" onChange={(e) => handleChange(e)} />
            </div>
            <h2 id="artistsTitle">Artists</h2>
            <motion.div
                 initial={{opacity:0,scale:0.5}}
                 animate={{opacity:1,scale:1}}
                 transition={{
                default: { duration: 1 },
                          }} 
            >
            {
            artists.map((artist,index)=><ArtistItem key={artist.id} artist={artist} />)
            } 
            </motion.div>
            </div>  
        </div>
        </>
    )
}

export default Artist
