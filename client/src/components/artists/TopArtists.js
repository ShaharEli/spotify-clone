import React,{useEffect, useState} from 'react'
import "./Artist.css"
import axios from 'axios'
import ArtistItem from "./ArtistItem"
import {motion} from 'framer-motion'

function TopArtists() {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [artists,setArtists] =useState([])

    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/top_artists")
            data.map(artist=> {
                if(artist.uploaded_at===null){
                    artist.uploaded_at=generateTime()
                } 
                return artist})
            setArtists(data)
        })()
    }, [])
    return (
        
        <div id="topArtists">
            <div style={{width:"80%"}}>
            <h2 id="artistsTitle">Top Artists</h2>
            <motion.div
                    initial={{opacity:0,x:"100%"}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0}}
                    transition={{
                        default: { duration: 0.9 },
                    }}
            >
            {
            artists.map((artist,index)=><ArtistItem key={artist.id} artist={artist} />)
            } 
            </motion.div>
            </div>  
        </div>
    )
}

export default TopArtists
