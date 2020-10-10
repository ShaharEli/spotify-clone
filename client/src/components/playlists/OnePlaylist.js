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
    const [songs,setSongs] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        (async ()=>{
            try{
            const {data} = await axios.get(`/playlists/${id}`,{headers:{
            token:Cookie.get("token")}})
            setPlaylist(data)
            setSongs(data.Playlists_songs)
            }catch(e){
            if(e.response.status===403){
                window.location.reload();
            }
        }setLoading(false)
        })()
    }, [id])
    
    return (
        playlist.name?
        <>
        <div 
        className="onePlaylist">
        <h2>
            {
            playlist.name
            }
        </h2>
            <img className="coverImg" alt="" src={playlist.coverImg}/>
        <h3>{playlist.createdAt.slice(0,10)}</h3>
        <div className="playlistMedia">
        {
            songs.map(song=>{
                return <SongItem key={song.title} query={["playlist",playlist.id]} song={song} maxWidth={true} />
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
