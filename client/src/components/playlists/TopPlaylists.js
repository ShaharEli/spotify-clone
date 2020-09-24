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
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [playlists,setPlaylists] =useState([])

    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/top_playlists",{headers:{
                token:Cookie.get("token"),email:Cookie.get("email")
            }})
            data.map(playlist=> {
                if(playlist.uploaded_at===null){
                    playlist.uploaded_at=generateTime()
                } 
                return playlist})

            setPlaylists(data)

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
