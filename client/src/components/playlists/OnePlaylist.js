import React, { useState, useEffect } from 'react'
import "./OnePlaylist.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import SongItem from '../songs/SongItem'

function OnePlaylist() {
    const {id} =useParams()
    const [playlist,setPlaylist] = useState([])
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get(`/playlist/${id}`)
            data.map(playlist=> {
                console.log(playlist);
            if(playlist.playlist_date===null){
                playlist.playlist_date=generateTime()
            }
            if(playlist.upload_at===null){
                playlist.upload_at=generateTime()
            }
            return playlist
         }
            )
            setPlaylist(data)
        })()
    }, [id])
    
    return (
        playlist.length>0&&
        <div className="onePlaylist">
        <h2>
            {
            playlist[0].playlist
            }
        </h2>
            <img className="coverImg" alt="" src={playlist[0].cover_img}/>
        <h3>{playlist[0].playlist_date}</h3>
        {
            playlist.map(playlist=>{
                const song = {upload_at:playlist.upload_at,title:playlist.title,artist:playlist.artist,length:playlist.length,youtube_link:playlist.youtube_link,album:playlist.album,album_id:playlist.album_id}
                return <SongItem key={playlist.title} song={song} maxWidth={true} />
            })
        }
        </div>

    )
}

export default OnePlaylist
