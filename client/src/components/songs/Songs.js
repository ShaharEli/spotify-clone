import React,{useEffect, useState} from 'react'
import "./Songs.css"
import axios from 'axios'
import SongItem from './SongItem'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import Cookie from "js-cookie"

  
const Songs = () => {


    const [songs,setSongs] =useState([])
    const [songsUnfiltered,setSongsUnfiltered] = useState([])
    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get("/songs",{headers:{
                    token:Cookie.get("token")
                }})
                setSongs(data)
                setSongsUnfiltered(data)
            }catch(e){console.error(e.message)}
        })()

    }, [])

    const handleChange=(e)=>{
        setSongs(songsUnfiltered.filter(song=>{
             return song.title.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }
    return (
        <>
        <div id="songs"
                
                >
            <div style={{width:"80%"}}>
            <div className="searchDiv">
            <TextField style={{marginTop: 10 }}  id="searchInput" autoComplete="off" label="Search song" onChange={(e) => handleChange(e)} />
            </div>
            <h2  id="songsTitle">Songs</h2>
            <div style={{width:"100%",display:"flex",justifyContent:"flex-end",marginBottom:10}}>
            <Link style={{color:"black"}} to="/addSong" >
            <Tooltip title="add new song">
            <AddCircleOutlineIcon />
            </Tooltip>
            </Link>
            </div>


            {
            songs.map((song,index)=><SongItem key={song.id} song={song} index={index} />)
            } 
            </div>  
        </div>
        </>
    )
}

export default Songs
