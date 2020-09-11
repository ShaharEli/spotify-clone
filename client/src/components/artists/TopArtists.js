import React,{useEffect, useState} from 'react'
import "./Artist.css"
import axios from 'axios'
import ArtistItem from "./ArtistItem"

function TopArtists() {
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
        (async ()=>{
            const {data} = await axios.get("/top_artists")
            data.map(artist=> {
                if(artist.uploaded_at===null){
                    artist.uploaded_at=generateTime()
                } 
                return artist})
            setArtists(data)
        })()
    }, [])
    return (
        
        <div id="artists">
            <div style={{width:"80%"}}>
            <h2 id="artistsTitle">Top Artists</h2>
            {
            artists.map((artist,index)=><ArtistItem key={artist.id} artist={artist} />)
            } 
            </div>  
        </div>
    )
}

export default TopArtists
