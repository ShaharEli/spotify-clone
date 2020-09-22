import "./Albums.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import AlbumItem from "./AlbumItem"
import TextField from '@material-ui/core/TextField';
import {motion} from 'framer-motion'

function Albums() {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [albums,setAlbums] =useState([])
    const [unfiltredAlbums,setUnfiltredAlbums] =useState([])

    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/albums")
            data.map(album=> {
                if(album.upload_at===null){
                    album.upload_at=generateTime()
                } 
                if(album.created_at===null){
                    album.created_at=generateTime()
                } 
                return album})
            setAlbums(data)
            setUnfiltredAlbums(data)
        })()
    }, [])

    const handleChange=(e)=>{
        setAlbums(unfiltredAlbums.filter(album=>{
             return album.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    return (
        <>
        <motion.div id="albums" 
                initial={{opacity:0,x:"100%"}}
                animate={{opacity:1,x:0}}
                   transition={{
                       default: { duration: 1.2,delay:0.5 },
                           
                   }} >
            <div style={{width:"80%"}}>
            <div className="searchDiv">
            <TextField style={{marginTop: 10,textAlign:"center" }}  id="searchInput" autoComplete="off" label="Search album" onChange={(e) => handleChange(e)} />
            </div>
            <h2 id="albumsTitle">Albums</h2>
            <div >
            {
            albums.map((album,index)=><AlbumItem key={album.id} album={album} />)
            } 
            </div>
            </div>  
        </motion.div>
        </>
    )
}

export default Albums
