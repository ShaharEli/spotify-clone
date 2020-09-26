import React,{useEffect, useState} from 'react'
import "./Artist.css"
import axios from 'axios'
import {motion} from 'framer-motion'
import Carousel from 'react-elastic-carousel';
import TopArtist from './TopArtist'
import Cookie from "js-cookie"



function TopArtists() {
    const breakPoints = [
        { width: 270, itemsToShow: 2 },
        { width: 371, itemsToShow: 3 },
        { width: 485, itemsToShow: 4 },
        { width: 565, itemsToShow: 5 },
        { width:630 , itemsToShow: 6 },
        { width:730 , itemsToShow: 7 },
        { width: 950, itemsToShow: 8 },
      ]

    
    const [artists,setArtists] =useState([])

    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get("/artists/top",{headers:{
                    token:Cookie.get("token")
                }})
                setArtists(data)
            }catch(e){
                if(e.response.status===403){
                    window.location.reload();
                }
            }

        })()
    }, [])
    return (
        
        <div id="topArtists">
            <div style={{width:"90%"}}>
            <motion.div
                    initial={{opacity:0,x:"100%"}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0}}
                    transition={{
                        default: { duration: 1.8 },
                    }}
            >
             <Carousel itemsToShow={8} itemPadding={[10]}
             breakPoints={breakPoints}>
            {
            artists.map((artist,index)=><TopArtist key={artist.id} artist={artist} />)
            } 
            </Carousel>
            </motion.div>
            </div>  
        </div>
    )
}

export default TopArtists
