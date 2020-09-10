import "./Albums.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import AlbumItem from "./AlbumItem"
function Albums() {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [albums,setAlbums] =useState([])
    useEffect(() => {
        const fetch= async ()=>{
            const {data} = await axios.get("/albums")
            data.map(album=> {
                if(album.upload_at===null){
                    album.upload_at=generateTime()
                } 
                if(album.created_at===null){
                    album.created_at=generateTime()
                } 
                return album})
            setAlbums(data)
        }
        fetch()
    }, [])

    return (
        
        <div id="albums">
            <div style={{width:"80%"}}>
            <h2 id="albumsTitle">Albums</h2>
            {
            albums.map((album,index)=><AlbumItem key={album.id} album={album} />)
            } 
            </div>  
        </div>
    )
}

export default Albums
