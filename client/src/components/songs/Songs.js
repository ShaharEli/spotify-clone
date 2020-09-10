import React,{useEffect, useState} from 'react'
import "./Songs.css"
import axios from 'axios'
import SongItem from './SongItem'


const Songs = () => {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    const [songs,setSongs] =useState([])
    useEffect(() => {
        const fetch= async ()=>{
            const {data} = await axios.get("/songs")
            data.map(song=> {
                if(song.upload_at===null){
                    song.upload_at=generateTime()
                } 
                return song})
            setSongs(data)
        }
        fetch()
    }, [])
    return (
    
        <div id="songs">
            <div style={{width:"80%"}}>
            <h2 id="songsTitle">Songs</h2>
            {
            songs.map((song)=><SongItem key={song.id} song={song} />)
            } 
            </div>  
        </div>
    )
}

export default Songs
