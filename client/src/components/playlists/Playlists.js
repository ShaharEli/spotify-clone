import "./Playlists.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import PlaylistItem from "./PlaylistItem"
function Playlists() {
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
        const fetch= async ()=>{
            const {data} = await axios.get("/playlists")
            data.map(playlist=> {
                if(playlist.uploaded_at===null){
                    playlist.uploaded_at=generateTime()
                } 
                return playlist})

            setPlaylists(data)

        }
        fetch()
    }, [])

    return (
        
        <div id="playlists">
            <div style={{width:"80%"}}>
            <h2 id="playlistsTitle">Playlists</h2>
            {
            playlists.map((playlist,index)=><PlaylistItem key={playlist.id} playlist={playlist} />)
            } 
            </div>  
        </div>
    )
}

export default Playlists
