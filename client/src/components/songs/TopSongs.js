import React,{useEffect, useState} from 'react'
import "./Songs.css"
import axios from 'axios'
import TopSong from './TopSong'
import {motion} from 'framer-motion'
import Carousel from 'react-elastic-carousel';
import Cookie from "js-cookie"


const TopSongs = () => {

    const breakPoints = [
        { width: 270, itemsToShow: 2 },
        { width: 371, itemsToShow: 3 },
        { width: 485, itemsToShow: 4 },
        { width: 565, itemsToShow: 5 },
        { width:630 , itemsToShow: 6 },
        { width:730 , itemsToShow: 7 },
        { width: 950, itemsToShow: 8 },
      ]

    const [songs,setSongs] =useState([])
    useEffect(() => {
        (async ()=>{try{
            const {data} = await axios.get("/songs/top",{headers:{
                token:Cookie.get("token")
            }})
            setSongs(data)
        }catch(e){console.error(e.message)}
        })()

        

    }, [])

    return (
        <>

        <div id="topSongs">
            <div style={{width:"90%"}}>
            <motion.div
                    initial={{opacity:0,x:"-100%"}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0}}
                    transition={{
                        default: { duration: 1.8 },

                    }}
            >
             <Carousel 
               breakPoints={breakPoints}
             itemsToShow={8} itemPadding={[10]}>
            {
            songs.map((song)=>{
            return <TopSong query={["all_songs","true"]} key={song.id} song={song} />})
            } 
            </Carousel>   
            </motion.div>
            </div>  
        </div>
        </>
    )
}

export default TopSongs
