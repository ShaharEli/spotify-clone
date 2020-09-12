import React,{useEffect, useState} from 'react'
import "./Songs.css"
import axios from 'axios'
import TopSong from './TopSong'
import {motion} from 'framer-motion'


const TopSongs = () => {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    const [songs,setSongs] =useState([])
    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/top_songs")
            data.map(song=> {
                if(song.upload_at===null){
                    song.upload_at=generateTime()
                } 
                return song})
            setSongs(data)
        })()

    }, [])

    return (
        <>

        <div id="topSongs">
            <div style={{width:"80%"}}>
            <h2 id="songsTitle">Top Songs</h2>
            <motion.div
                    initial={{opacity:0,x:"-100%"}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0}}
                    transition={{
                        default: { duration: 0.9 },

                    }}
            >
            {
            songs.map((song)=>{
            return <TopSong key={song.id} song={song} />})
            } 
            </motion.div>
            </div>  
        </div>
        </>
    )
}

export default TopSongs
