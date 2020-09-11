import "./Playlists.css"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import PlaylistItem from "./PlaylistItem"
import TextField from '@material-ui/core/TextField';

function Playlists({search}) {
    function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
    
    const [playlists,setPlaylists] =useState([])
    const [unfiltredPlaylists,setUnfiltrePlaylists] =useState([])

    useEffect(() => {
        (async ()=>{
            const {data} = await axios.get("/playlists")
            data.map(playlist=> {
                if(playlist.uploaded_at===null){
                    playlist.uploaded_at=generateTime()
                } 
                return playlist})

            setPlaylists(data)
            setUnfiltrePlaylists(data)

        })()
    }, [])
    const handleChange=(e)=>{
        setPlaylists(unfiltredPlaylists.filter(playlist=>{
             return playlist.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }
    return (
        
        <div id="playlists">
            <div style={{width:"80%"}}>
            {search&&
            <div className="searchDiv">
            <TextField style={{marginTop: 10,textAlign:"center" }} variant="outlined" id="searchInput" autoComplete="off" label="Search playlist" onChange={(e) => handleChange(e)} />
            </div>}
            <h2 id="playlistsTitle">Playlists</h2>
            {
            playlists.map((playlist,index)=><PlaylistItem key={playlist.id} playlist={playlist} />)
            } 
            </div>  
        </div>
    )
}

export default Playlists
