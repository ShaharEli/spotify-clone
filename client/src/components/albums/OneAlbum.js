import React, { useState, useEffect } from 'react'
import "./OneAlbum.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import SongItem from '../songs/SongItem'
import { Link } from 'react-router-dom'
import NotFound from '../../NotFound/NotFound'
import Loading from '../loading/Loading'
import Cookie from "js-cookie"


function OneAlbum() {
    const [loading,setLoading]=  useState(true)
    const {id} =useParams()
    const [album,setAlbum] = useState([])
    const [albumInfo,setAlbumInfo] = useState([])


    useEffect(() => {
        (async ()=>{
            try{
                const {data} = await axios.get(`/albums/${id}`,{headers:{
                    token:Cookie.get("token")
                }})
            setAlbum(data.Songs)
            setAlbumInfo(data)
            setLoading(false)
            console.log(data);
            }
            catch(e){
                console.error(e.message)
            }

            })()
    }, [id])
    
    
    return (
        albumInfo.createdAt?
        <>
        <div className="oneAlbum">
        <h2>
            {
            albumInfo.name
            }
        </h2>
        <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/artist/${album[0].artistId}`}>
        <h3>
            By &nbsp;
            {
            albumInfo.Artist ?  albumInfo.Artist.name :"no artist"
        }
        </h3>
        </Link>
            <img className="coverImg" alt="" src={albumInfo.coverImg}/>
        <h3>{albumInfo.createdAt.slice(0,10)}</h3>
        <div className="albumMedia">
        {
                album.map(album=>{
                return <SongItem key={album.song} query={["album",id]} song={{...album,albumInfo}} />
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
