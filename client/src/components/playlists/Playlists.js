import "./Playlists.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import PlaylistItem from "./PlaylistItem"
import TextField from '@material-ui/core/TextField';
import {motion} from 'framer-motion'
import Cookie from "js-cookie"
function Playlists() {

    
    const [playlists,setPlaylists] =useState([])
    const [unfiltredPlaylists,setUnfiltrePlaylists] =useState([])

    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get("/playlists",{headers:{
                    token:Cookie.get("token")
                }})
                setPlaylists(data)
                setUnfiltrePlaylists(data)
            }catch(e){console.error(e)}


        })()
    }, [])
    const handleChange=(e)=>{
        setPlaylists(unfiltredPlaylists.filter(playlist=>{
             return playlist.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }
    return (
        <>
        <div id="playlists" >
            <div style={{width:"80%"}}>
            <div className="searchDiv">
            <TextField style={{marginTop: 10,textAlign:"center" }} id="searchInput" autoComplete="off" label="Search playlist" onChange={(e) => handleChange(e)} />
            </div>
            <h2 id="playlistsTitle">Playlists</h2>
            <motion.div
                initial={{opacity:0,scale:0.5}}
                animate={{opacity:1,scale:1}}
                   transition={{
                       default: { duration: 1 },
                   }} 
            >
            {
            playlists.map((playlist,index)=><PlaylistItem key={playlist.id} playlist={playlist} />)
            } 
            </motion.div>
            </div>  
        </div>
        </>
    )
}

export default Playlists
