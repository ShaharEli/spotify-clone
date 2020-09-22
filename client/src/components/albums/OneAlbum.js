import React, { useState, useEffect } from 'react'
import "./OneAlbum.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import SongItem from '../songs/SongItem'
import { Link } from 'react-router-dom'
import NotFound from '../../NotFound/NotFound'
import Loading from '../loading/Loading'
import {motion} from 'framer-motion'

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
                const {data} = await axios.get(`/album/${id}`)
            data.map(album=> {
                if(album.upload_at===null){
                    album.upload_at=generateTime()
                } 
                if(album.created_at===null){
                    album.created_at=generateTime()
                } 
                if(album.song_upload_date===null){
                    album.song_upload_date=generateTime()
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
        <motion.div className="oneAlbum"
        initial={{opacity:0,x:"-100%"}}
         animate={{opacity:1,x:0}}
         transition={{
        default: { duration: 1.2,delay:0.5 }                
                                    }}>
        <h2>
            {
            album[0].name
            }
        </h2>
        <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/artist/${album[0].artist_id}`}>
        <h3>
            By &nbsp;
            {
            album[0].artist
            }
        </h3>
        </Link>
            <img className="coverImg" alt="" src={album[0].cover_img}/>
        <h3>{album[0].upload_at}</h3>
        <div className="albumMedia">
        {
            album.map(album=>{
                const song = {id:album.song_id,artist_id:album.artist_id,upload_at:album.song_upload_date,title:album.song,artist:album.artist,length:album.length,youtube_link:album.youtube_link,truck_number:album.truck_number}
                return <SongItem key={album.song} query={["album",id]} song={song} />
            })
        }
        </div>
        </motion.div>
        </>
        :
        !loading?
        <NotFound />
        :
        <Loading />

    )
}

export default OneAlbum
