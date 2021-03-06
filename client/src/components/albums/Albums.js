import "./Albums.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import AlbumItem from "./AlbumItem"
import TextField from '@material-ui/core/TextField';
import {motion} from 'framer-motion'
import Cookie from "js-cookie"

function Albums() {
    
    const [albums,setAlbums] =useState([])
    const [unfiltredAlbums,setUnfiltredAlbums] =useState([])

    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get("/albums",{headers:{
                    token:Cookie.get("token")
                }})
                setAlbums(data)
                setUnfiltredAlbums(data)
            }catch(e){
                if(e.response.status===403){
                    window.location.reload();
                }
            }
 
        })()
    }, [])

    const handleChange=(e)=>{
        setAlbums(unfiltredAlbums.filter(album=>{
             return album.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    return (
        <>
        <div id="albums"  >
            <div style={{width:"80%"}}>
            <div className="searchDiv">
            <TextField style={{marginTop: 10,textAlign:"center",label:"10px" }}  id="searchInput" autoComplete="off" label={`Showing ${albums.length} results`} onChange={(e) => handleChange(e)} />
            </div>
            <h2 id="albumsTitle">Albums</h2>
            <motion.div 
           initial={{opacity:0,scale:0.5}}
           animate={{opacity:1,scale:1}}
            transition={{
            default: { duration: 1 },
               }} 
            >
            {
            albums.map((album,index)=><AlbumItem key={album.id} album={album} />)
            } 
            </motion.div>
            </div>  
        </div>
        </>
    )
}

export default Albums
