import React, { useState, useEffect } from 'react'
import "./OneArtist.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import SongItem from '../songs/SongItem'
function OneArtist() {
    const {id} =useParams()
    const [artist,setArtist] = useState([])
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
            const {data} = await axios.get(`/artist/${id}`)
            data.map(artist=> {
                if(artist.artist_date===null){
                    artist.artist_date=generateTime()
                } else{
                    artist.artist_date=artist.artist_date.slice(0,10)
                }
                if(artist.upload_at===null){
                    artist.upload_at=generateTime()
                }
                return artist})
            setArtist(data)
        })()
    }, [id])
    
    return (
        artist.length>0&&
        <div className="oneArtist">
        <h2>
            {
            artist[0].name
            }
        </h2>
        <img className="artistCoverImg" alt="" src={artist[0].cover_img}/>
        <h3>{artist[0].artist_date}</h3>
        {
            artist.map(song=>{
                const songData = {album:song.album_name,artist_id:song.artist_id, upload_at:song.upload_at, title:song.title,artist:song.name,length:song.length,youtube_link:song.youtube_link,album_id:song.album_id}
                return <SongItem key={song.title} song={songData} maxWidth={true} />
            })
        }
        </div>

    )
}

export default OneArtist
