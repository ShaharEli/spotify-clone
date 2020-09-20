import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import axios from "axios"
import NotFound from '../../NotFound/NotFound';
import Loading from '../loading/Loading';
import solenolyrics from "solenolyrics"
import "./OneSong.css"
import SongItem from './SongItem';
import MyPlayer from "./MyPlayer"
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Swal from 'sweetalert2';
import Header from '../header/Header';
import AuthApi from '../Aoth/AuthApi';


function generateTime() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return `${today}`;
  }

function useQuery() {    
    return new URLSearchParams(useLocation().search);
 }
function OneSong() {
    const Auth = React.useContext(AuthApi)
    const [playing,setPlaying] = useState(true)
    const [nextQuery,setNextQuery] = useState([])
    let query = useQuery();
    const {id} = useParams()
    const [song, setSong] = useState({})
    const [list, setList] = useState([]) 
    const [loading,setLoading]=  useState(true) 
    const [lyrics,setLyrics]=  useState("")
    const [counter,setCounter] =useState(0)
    const [restore,setRestore] = useState(false)
    const pause =()=>{
        setPlaying(false)
    }
    const play=()=>{
        setPlaying(true)
    }
    const next = ()=>{
        if(counter===list.length-1){
            Swal.fire("You finished the list","","success")
            setRestore(prev=>!prev)
            setSong(list[0])
            setCounter(0)
        }
        else{
            setCounter(prev=>prev+1)
            if(list[counter].title===song.title){
                setSong(list[counter+1])
            }
            else{
                setSong(list[counter])
            }
        }
    }
    const previous = ()=>{
        if(counter===0){
            Swal.fire("You got to the start of the list","","error")
        }
        else{
            setCounter(prev=>prev-1)
            setSong(list[counter-1])
        }
    }

    useEffect(()=>{
            (async ()=>{
                try{
                    let {data}= await axios.get(`/song/${id}`)
                    setSong(data[0]) 
                    if(query.get("artist")){
                        data =  await axios.get(`/artist/${query.get("artist")}`)
                        setList(data.data)
                        // eslint-disable-next-line
                        setCounter(data.data.findIndex(e=>e.id==id))
                        setNextQuery(["artist",query.get("artist")])
                    }
                    else if(query.get("favorites")){
                        data =  await axios.get(`/favorites_songs/${Auth.email}`)
                        data=data.data
                        let songsList = []
                        for (let i=0;i<data.length;i++){
                            if (songsList.find(element=>element.id===data[i].id)){
                                continue
                            }
                            if(data[i].upload_at===null){
                                data[i].upload_at=generateTime()
                            } 
                            songsList.push(data[i])        
                        }
                        setList(songsList)
                        setNextQuery(["favorites","true"])

                    }
                    else if(query.get("album")){
                        data =  await axios.get(`/album/${query.get("album")}`)
                        const albumsSongs = data.data.map((song)=>{
                            song.id = song.song_id
                            return song
                        })
                        setList(albumsSongs)
                        // eslint-disable-next-line
                        setCounter(data.data.findIndex(e=>e.id==id))
                        setNextQuery(["album",query.get("album")])
                    }
                    else if(query.get("playlist")){
                        data =  await axios.get(`/playlist/${query.get("playlist")}`)
                        setList(data.data)
                        // eslint-disable-next-line
                        setCounter(data.data.findIndex(e=>e.id==id))
                        setNextQuery(["playlist",query.get("playlist")])
                    }
                    else{
                        data =  await axios.get(`/top_songs`)
                        setList(data.data)
                        // eslint-disable-next-line
                        setCounter(data.data.findIndex(e=>e.id==id))
                        setNextQuery(["top_songs","true"])

                    }
                }catch(e){
                }
    
                setLoading(false)
            }
        )()
    // eslint-disable-next-line
    },[id,restore])
    useEffect(()=>{
        (async()=>{
            try{
                const words= await solenolyrics.requestLyricsFor(song.title)
                setLyrics(words)
            }catch(e){}
        })()
    },[song])
    const spanStyle = { fontSize : 12 }
    const controlStyle = { cursor : "pointer" }
    return (
        song.title?
        <>
        <Header />
        <div className="oneSong">
            <div  className="playOneSong">  
            <h2>{song.title} </h2><hr style={{  border: "1.5px solid black"}}/>
            <span style={spanStyle}>by: &nbsp;{song.artist}</span>&nbsp;&nbsp;
            <span style={spanStyle}>album: &nbsp;{song.album}</span>
            <span style={spanStyle}> |&nbsp;{song.length.slice(3,10)}</span>
            <MyPlayer playing={playing} pause={pause} play={play} link={song.youtube_link} next={next} />
            <div style={{width:"100%",height:"40%",overflowY:"scroll"}}>{lyrics}</div>
            <div className="controls">
                <SkipPreviousIcon style={controlStyle} onClick={previous} />
                {
                 !playing?
                 <PlayArrowIcon style={controlStyle}  onClick={play} />
                 :
                 <PauseIcon style={controlStyle} onClick={pause} />   
                }
                <SkipNextIcon style={controlStyle} onClick={next} />
                </div>
         </div>
            <div className="queue">
                <h2>Queue</h2>
                {
                    list.map((item,index)=>{
                        item.title=item.song?item.song:item.title
                        return <SongItem background={item.title===song.title} animation={false} query={nextQuery} key={item.id+index}  oneSongProp={true} song={item} />
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

export default OneSong
