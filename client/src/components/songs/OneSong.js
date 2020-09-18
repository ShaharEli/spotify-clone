import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
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
    const [nextQuery,setNextQuery] = useState([])
    let query = useQuery();
    const {id} = useParams()
    const [song, setSong] = useState({})
    const [list, setList] = useState([]) 
    const [loading,setLoading]=  useState(true) 
    const [lyrics,setLyrics]=  useState("")


    useEffect(()=>{
            (async ()=>{
                try{
                    let {data}= await axios.get(`/song/${id}`)
                    setSong(data[0])
                    if(query.get("artist")){
                        data =  await axios.get(`/artist/${query.get("artist")}`)
                        setList(data.data.filter(e=>e.id!==Number(id)))
                        setNextQuery(["artist",query.get("artist")])
                    }
                    else if(query.get("album")){
                        data =  await axios.get(`/album/${query.get("album")}`)
                        const albumsSongs = data.data.map((song)=>{
                            song.id = song.song_id
                            return song
                        })
                        setList(albumsSongs.filter(e=>e.id!==Number(id)))
                        setNextQuery(["album",query.get("album")])
                    }
                    else if(query.get("playlist")){
                        data =  await axios.get(`/playlist/${query.get("playlist")}`)
                        setList(data.data.filter(e=>e.id!==Number(id)))
                        setNextQuery(["playlist",query.get("playlist")])
                    }
                    else{
                        data =  await axios.get(`/top_songs`)
                        setList(data.data.filter(e=>e.id!==Number(id)))
                        setNextQuery(["top_songs","true"])


                    }
                }catch(e){
                }
                setLoading(false)
            }
        )()
    // eslint-disable-next-line
    },[id])
    useEffect(()=>{
        (async()=>{
            try{
                const words= await solenolyrics.requestLyricsFor(song.title)
                setLyrics(words)
            }catch(e){}
        })()
    },[song])
    const spanStyle = { fontSize : 12 }
    return (
        song.title?
        <div className="oneSong">
            <div  className="playOneSong">  
            <h2>{song.title} </h2><hr style={{  border: "1.5px solid black"}}/>
            <span style={spanStyle}>by: &nbsp;{song.artist}</span>&nbsp;&nbsp;
            <span style={spanStyle}>album: &nbsp;{song.album}</span>
            <span style={spanStyle}> |&nbsp;{song.length.slice(3,10)}</span>
            <iframe  title={song.title} style={{width:"96%",height:"50%", frameBorder:"0"}}  src={song.youtube_link.replace("watch?v=","embed/").split("&list")[0]+"?autoplay=1"} allow="accelerometer; autoplay; encrypted-media" allowFullScreen />    
            <div style={{width:"100%",height:"50%",overflowY:"scroll"}}>{lyrics}</div>
         </div>
            <div className="queue">
                <h2>Queue</h2>
                {
                    list.map((item,index)=>{
                        item.title=item.song?item.song:item.title
                        return <SongItem animation={false} query={nextQuery} key={item.id+index}  oneSongProp={true} song={item} />
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
