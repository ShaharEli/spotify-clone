import React,{useEffect, useState} from 'react'
import "./Artist.css"
import axios from 'axios'
import ArtistItem from "./ArtistItem"
function Artist() {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [artists,setArtists] =useState([])
    useEffect(() => {
        const fetch= async ()=>{
            const {data} = await axios.get("/artists")
            data.map(artist=> artist.uploaded_at=generateTime())
            setArtists(data)
        }
        fetch()
    }, [])

    return (
        
        <div id="artists">
            <div style={{width:"80%"}}>
            <h2 id="artistsTitle">Artists</h2>
            {
            artists.map((artist,index)=><ArtistItem key={artist.id} artist={artist} />)
            } 
            </div>  
        </div>
    )
}

export default Artist
