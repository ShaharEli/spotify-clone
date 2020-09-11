import React, { useState, useEffect } from 'react'
import "./OneAlbum.css"
import {useParams} from "react-router-dom"
import axios from "axios"
function OneAlbum() {
    const {id} =useParams()
    const [album,setAlbum] = useState([])
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
        })()
    }, [id])
    
    return (
        album.length>0&&
        <div>
        <h2>
            {
            album[0].name
            }
        </h2>
            <img src
        </div>

    )
}

export default OneAlbum
