import React, { useState, useEffect } from 'react'
import "./OneAlbum.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import SongItem from '../songs/SongItem'
import { Link } from 'react-router-dom'
import NotFound from '../../NotFound/NotFound'
import Loading from '../loading/Loading'
import Cookie from "js-cookie"

function generateTime() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return `${today}`;
  }
  
function OneAlbum() {
    const [loading,setLoading]=  useState(true)
    const {id} =useParams()
    const [album,setAlbum] = useState([])


    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get(`/album/${id}`,{headers:{
                    token:Cookie.get("token")
                }})
            data.map(album=> {
                if(album.uploadAt===null){
                    album.uploadAt=generateTime()
                } 
                if(album.createdAt===null){
                    album.createdAt=generateTime()
                } 
                if(album.songUploadDate===null){
                    album.songUploadDate=generateTime()
                }
                return album})
            setAlbum(data)
            setLoading(false)
            }
            catch(e){

            }

            })()
    }, [id])
    
    
    return (
        album.length>0?
        <>
        <div className="oneAlbum">
        <h2>
            {
            album[0].name
            }
        </h2>
        <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/artist/${album[0].artistId}`}>
        <h3>
            By &nbsp;
            {
            album[0].artist
            }
        </h3>
        </Link>
            <img className="coverImg" alt="" src={album[0].coverImg}/>
        <h3>{album[0].uploadAt}</h3>
        <div className="albumMedia">
        {
            album.map(album=>{
                const song = {id:album.songId,artistId:album.artistId,uploadAt:album.songUploadDate,title:album.song,artist:album.artist,length:album.length,youtubeLink:album.youtubeLink,truckNumber:album.truckNumber}
                return <SongItem key={album.song} query={["album",id]} song={song} />
            })
        }
        </div>
        </div>
        </>
        :
        !loading?
        <NotFound />
        :
        <Loading />

    )
}

export default OneAlbum
