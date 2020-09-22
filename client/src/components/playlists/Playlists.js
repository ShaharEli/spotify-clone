import "./Playlists.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import PlaylistItem from "./PlaylistItem"
import TextField from '@material-ui/core/TextField';
import {motion} from 'framer-motion'

function Playlists() {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [playlists,setPlaylists] =useState([])
    const [unfiltredPlaylists,setUnfiltrePlaylists] =useState([])

    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/playlists")
            data.map(playlist=> {
                if(playlist.uploaded_at===null){
                    playlist.uploaded_at=generateTime()
                } 
                return playlist})

            setPlaylists(data)
            setUnfiltrePlaylists(data)

        })()
    }, [])
    const handleChange=(e)=>{
        setPlaylists(unfiltredPlaylists.filter(playlist=>{
             return playlist.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }
    return (
        <>
        <motion.div id="playlists"
                initial={{opacity:0,x:"100%"}}
                animate={{opacity:1,x:0}}
                   transition={{
                       default: { duration: 1.2,delay:0.5 },
                           
                   }}>
            <div style={{width:"80%"}}>
            <div className="searchDiv">
            <TextField style={{marginTop: 10,textAlign:"center" }} id="searchInput" autoComplete="off" label="Search playlist" onChange={(e) => handleChange(e)} />
            </div>
            <h2 id="playlistsTitle">Playlists</h2>
            <div

            >
            {
            playlists.map((playlist,index)=><PlaylistItem key={playlist.id} playlist={playlist} />)
            } 
            </div>
            </div>  
        </motion.div>
        </>
    )
}

export default Playlists
