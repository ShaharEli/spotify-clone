import React, { useState, useEffect } from 'react'
import "./OnePlaylist.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import SongItem from '../songs/SongItem'
import NotFound from '../../NotFound/NotFound'
import Loading from '../loading/Loading'
import Cookie from "js-cookie"

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
            const {data} = await axios.get(`/playlist/${id}`,{headers:{
                token:Cookie.get("token")
            }})
            data.map(playlist=> {
            if(playlist.playlistDate===null){
                playlist.playlistDate=generateTime()
            }
            if(playlist.uploadAt===null){
                playlist.uploadAt=generateTime()
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
        <>
        <div 
        className="onePlaylist">
        <h2>
            {
            playlist[0].playlist
            }
        </h2>
            <img className="coverImg" alt="" src={playlist[0].coverImg}/>
        <h3>{playlist[0].playlistDate}</h3>
        <div className="playlistMedia">
        {
            playlist.map(playlist=>{
                const song = {id:playlist.id,artistId:playlist.artistId,uploadAt:playlist.uploadAt,title:playlist.title,artist:playlist.artist,length:playlist.length,youtubeLink:playlist.youtubeLink,album:playlist.album,albumId:playlist.albumId}
                return <SongItem key={playlist.title} query={["playlist",playlist.playlistId]} song={song} maxWidth={true} />
            })
        }
        </div>
        </div>
        </>
        :
        !loading?
        <NotFound />
        :<Loading />
        

    )
}

export default OnePlaylist
