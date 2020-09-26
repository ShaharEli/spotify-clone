import "./Playlists.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Carousel from 'react-elastic-carousel';
import TopPlaylist from "./TopPlaylist"
import Cookie from "js-cookie"
function TopPlaylists() {
    const breakPoints = [
        { width: 270, itemsToShow: 2 },
        { width: 371, itemsToShow: 3 },
        { width: 485, itemsToShow: 4 },
        { width: 565, itemsToShow: 5 },
        { width:630 , itemsToShow: 6 },
        { width:730 , itemsToShow: 7 },
        { width: 950, itemsToShow: 8 },
      ]
    
    const [playlists,setPlaylists] =useState([])

    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get("/playlists/top",{headers:{
                    token:Cookie.get("token")
                }})
                setPlaylists(data)
            }catch(e){
                if(e.response.status===403){
                    window.location.reload();
                }
            }


        })()
    }, [])

    return (
        
        <div id="topPlaylists">
            <div style={{width:"90%"}} >
            <div
            >
             <Carousel breakPoints={breakPoints} itemsToShow={8} itemPadding={[10]}>
            {
            playlists.map((playlist,index)=><TopPlaylist key={playlist.id} playlist={playlist} />)
            } 
            </Carousel>
            </div>
            </div>  
        </div>
    )
}

export default TopPlaylists
