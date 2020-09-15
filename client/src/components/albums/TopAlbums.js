import "./Albums.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import AlbumItem from "./AlbumItem"
import {motion} from 'framer-motion'
import Carousel from 'react-elastic-carousel';
import TopAlbum from "./TopAlbum"

function TopAlbums() {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [albums,setAlbums] =useState([])
    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/top_albums")
            data.map(album=> {
                if(album.upload_at===null){
                    album.upload_at=generateTime()
                } 
                if(album.created_at===null){
                    album.created_at=generateTime()
                } 
                return album})
            setAlbums(data)
        })()
    }, [])


    return (
        
        <div id="topAlbums">
            <div style={{width:"80%"}}>
            <motion.div
                    initial={{opacity:0,x:"100%"}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0}}
                    transition={{
                        default: { duration: 0.9 },
                    }}
            >
             <Carousel itemsToShow={8} itemPadding={[10]}>
            {
            albums.map((album)=><TopAlbum key={album.id} album={album} />)
            } 
            </Carousel>
            </motion.div>
            </div>  
        </div>
    )
}

export default TopAlbums
