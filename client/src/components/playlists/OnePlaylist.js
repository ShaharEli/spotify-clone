import React, { useState, useEffect } from 'react'
import "./OnePlaylist.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import SongItem from '../songs/SongItem'
import NotFound from '../../NotFound/NotFound'
import Loading from '../loading/Loading'

function OnePlaylist() {
    const {id} =useParams()
    const [playlist,setPlaylist] = useState([])
    const [loading,setLoading] = useState(true)
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
            try{
            const {data} = await axios.get(`/playlist/${id}`)
            data.map(playlist=> {
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
        }catch(e){
        }setLoading(false)
        })()
    }, [id])
    
    return (
        playlist.length>0?
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
                const song = {id:playlist.id,artist_id:playlist.artist_id,upload_at:playlist.upload_at,title:playlist.title,artist:playlist.artist,length:playlist.length,youtube_link:playlist.youtube_link,album:playlist.album,album_id:playlist.album_id}
                return <SongItem key={playlist.title} query={["playlist",playlist.playlist_id]} song={song} maxWidth={true} />
            })
        }
        </div>
        :
        !loading?
        <NotFound />
        :<Loading />
        

    )
}

export default OnePlaylist
