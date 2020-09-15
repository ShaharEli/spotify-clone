import "./Playlists.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'
import Carousel from 'react-elastic-carousel';
import TopPlaylist from "./TopPlaylist"

function TopPlaylists() {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [playlists,setPlaylists] =useState([])

    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/top_playlists")
            data.map(playlist=> {
                if(playlist.uploaded_at===null){
                    playlist.uploaded_at=generateTime()
                } 
                return playlist})

            setPlaylists(data)

        })()
    }, [])

    return (
        
        <div id="topPlaylists">
            <div style={{width:"80%"}} >
            <motion.div
                    initial={{opacity:0,x:"-100%"}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0}}
                    transition={{
                        default: { duration: 0.9 },
                    }}
            >
             <Carousel itemsToShow={8} itemPadding={[10]}>
            {
            playlists.map((playlist,index)=><TopPlaylist key={playlist.id} playlist={playlist} />)
            } 
            </Carousel>
            </motion.div>
            </div>  
        </div>
    )
}

export default TopPlaylists
