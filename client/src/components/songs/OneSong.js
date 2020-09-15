import React, { useEffect, useState } from 'react'
import {
    useLocation,
    useParams
} from "react-router-dom";
import axios from "axios"
import NotFound from '../../NotFound/NotFound';
import Loading from '../loading/Loading';
import solenolyrics from "solenolyrics"
import "./OneSong.css"
import SongItem from './SongItem';

function useQuery() {
    return new URLSearchParams(useLocation().search);
 }
function OneSong() {
    let query = useQuery();
    const {id} = useParams()
    const [song, setSong] = useState({})
    const [list, setList] = useState([]) 
    const [loading,setLoading]=  useState(true) 
    const [lyrics,setLyrics]=  useState("")


    useEffect(()=>{
        (
            async ()=>{
                try{
                    let {data}= await axios.get(`/song/${id}`)
                    setSong(data[0])
                    if(query.get("artist")){
                        data =  await axios.get(`/artist/${query.get("artist")}`)
                        setList(data.data)
                    }
                    else if(query.get("album")){
                        data =  await axios.get(`/album/${query.get("album")}`)
                        setList(data.data)
                    }
                    else if(query.get("playlist")){
                        data =  await axios.get(`/playlist/${query.get("playlist")}`)
                        setList(data.data)
                    }
                    else if(query.get("all_songs")){
                        data =  await axios.get(`/top_songs`)
                        setList(data.data)
                    }
                }catch(e){
                }
                setLoading(false)
            }
        )()
    },[])
    useEffect(()=>{
        (async()=>{
            try{
                const words= await solenolyrics.requestLyricsFor(song.title)
                setLyrics(words)
            }catch(e){}
        })()
    },[song])
    return (
        song.title?
        <div className="oneSong">
            <div  className="playOneSong">  
            <h2>{song.title} </h2>
            <span style={{fontSize:12}}>by: &nbsp;{song.artist}</span>&nbsp;&nbsp;
            <span style={{fontSize:12}}>album: &nbsp;{song.album}</span>
         <iframe title={song.title} style={{width:"96%",height:"50%", frameBorder:"0",}} src={song.youtube_link.replace("watch?v=","embed/").split("&list")[0]} allow="accelerometer; autoplay; encrypted-media" allowFullScreen />    
            <div style={{width:"100%",height:"50%",overflowY:"scroll"}}>{lyrics}</div>
         </div>
            <div className="queue">
                <h2>Queue</h2>
                {
                    list.map(item=>{
                        item.title=item.song?item.song:item.title
                        return <SongItem key={item.song} oneSongProp={true} song={item} />
                    })
                }
            </div>
        </div>
        :
        !loading?
        <NotFound />
        :
        <Loading />

    )
}

export default OneSong
