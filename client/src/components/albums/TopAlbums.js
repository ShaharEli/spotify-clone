import "./Albums.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'
import Carousel from 'react-elastic-carousel';
import TopAlbum from "./TopAlbum"
import Cookie from "js-cookie"
function generateTime() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return `${today}`;
  }

function TopAlbums() {
    const breakPoints = [
        { width: 270, itemsToShow: 2 },
        { width: 371, itemsToShow: 3 },
        { width: 485, itemsToShow: 4 },
        { width: 565, itemsToShow: 5 },
        { width:630 , itemsToShow: 6 },
        { width:730 , itemsToShow: 7 },
        { width: 950, itemsToShow: 8 },
      ]

    
    const [albums,setAlbums] =useState([])
    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get("/albums/top",{headers:{
                    token:Cookie.get("token")
                }})
                data.map(album=> {
                    if(album.uploadAt===null){
                        album.uploadAt=generateTime()
                    } 
                    if(album.createdAt===null){
                        album.createdAt=generateTime()
                    } 
                    return album})
                setAlbums(data)
            }catch(e){console.error(e.message)}

        })()
    }, [])


    return (
        
        <div id="topAlbums">
            <div style={{width:"90%"}}>
            <motion.div
                    initial={{opacity:0,x:"100%"}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0}}
                    transition={{
                        default: { duration: 1.8 },
                    }}
            >
             <Carousel itemsToShow={8} itemPadding={[10]} breakPoints={breakPoints}>
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
