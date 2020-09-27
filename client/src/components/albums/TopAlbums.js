import "./Albums.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'
import Carousel from 'react-elastic-carousel';
import TopAlbum from "./TopAlbum"
import Cookie from "js-cookie"


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
                setAlbums(data)
            }catch(e){
                if(e.response.status===403){
                    window.location.reload();
                }
            }

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
            albums.map((album)=><TopAlbum views={true} key={album.id} album={album} />)
            } 
            </Carousel>
            </motion.div>
            </div>  
        </div>
    )
}

export default TopAlbums
