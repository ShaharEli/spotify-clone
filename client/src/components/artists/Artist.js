import React,{useEffect, useState} from 'react'
import "./Artist.css"
import axios from 'axios'
import ArtistItem from "./ArtistItem"
import TextField from '@material-ui/core/TextField';
import {motion} from 'framer-motion'

function Artist() {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [artists,setArtists] =useState([])
    const [unfilteredArtists,setUnfilteredArtists] =useState([])

    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/artists")
            data.map(artist=> {
                if(artist.uploaded_at===null){
                    artist.uploaded_at=generateTime()
                } 
                return artist})
            setArtists(data)
            setUnfilteredArtists(data)
        })()
    }, [])
    const handleChange=(e)=>{
        setArtists(unfilteredArtists.filter(artist=>{
             return artist.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }
    return (
        <>
        <motion.div id="artists"
                initial={{opacity:0,x:"100%"}}
                animate={{opacity:1,x:0}}
                   transition={{
                       default: { duration: 1.2,delay:0.5 },
                           
                   }}>
            <div style={{width:"80%"}}>
            <div className="searchDiv">
            <TextField style={{marginTop: 10,textAlign:"center" }}  id="searchInput" autoComplete="off" label="Search artist" onChange={(e) => handleChange(e)} />
            </div>
            <h2 id="artistsTitle">Artists</h2>
            <div
            >
            {
            artists.map((artist,index)=><ArtistItem key={artist.id} artist={artist} />)
            } 
            </div>
            </div>  
        </motion.div>
        </>
    )
}

export default Artist
