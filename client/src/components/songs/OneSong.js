import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import axios from "axios"
import NotFound from '../../NotFound/NotFound';
import Loading from '../loading/Loading';
import solenolyrics from "solenolyrics"
import "./OneSong.css"
import SongItem from './SongItem';
import MyPlayer from "./MyPlayer"
import AuthApi from '../Aoth/AuthApi';
import Cookie from "js-cookie"

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
    const [nextQuery,setNextQuery] = useState([])
    let query = useQuery();
    const {id} = useParams()
    const [loading,setLoading]=  useState(true) 
    const [lyrics,setLyrics]=  useState("")



    useEffect(()=>{
            (async ()=>{
                try{
                    let {data}= await axios.get(`/songs/${id}`,{headers:{
                        token:Cookie.get("token"),email:Cookie.get("email")
                    }})
                    Auth.setSong(data)
                    if(query.get("artist")){
                        data =  await axios.get(`/artists/${query.get("artist")}`,{headers:{
                            token:Cookie.get("token"),email:Cookie.get("email")
                        }})
                        Auth.setList(data.data.Songs)
                        // eslint-disable-next-line
                        Auth.setCounter(data.data.findIndex(e=>e.id==id))
                        setNextQuery(["artist",query.get("artist")])
                    }
                    else if(query.get("favorites")){
                        data =  await axios.get(`/favorites/songs/${Auth.email}`,{headers:{
                            token:Cookie.get("token"),email:Cookie.get("email")
                        }})
                        data=data.data
                        console.log(data);
                        let songsList = []
                        for (let i=0;i<data.length;i++){
                        // eslint-disable-next-line
                            if (songsList.find(element=>element.id===data[i].id)){
                                continue
                            }
                            if(data[i].uploadAt===null){
                                data[i].uploadAt=generateTime()
                            } 
                            songsList.push(data[i])        
                        }
                        Auth.setList(songsList)
                        setNextQuery(["favorites","true"])

                    }
                    else if(query.get("album")){
                        data =  await axios.get(`/album/${query.get("album")}`,{headers:{
                            token:Cookie.get("token"),email:Cookie.get("email")
                        }})
                        const albumsSongs = data.data.map((song)=>{
                            song.id = song.songId
                            return song
                        })
                        Auth.setList(albumsSongs)
                        // eslint-disable-next-line
                        Auth.setCounter(data.data.findIndex(e=>e.id==id))
                        setNextQuery(["album",query.get("album")])
                    }
                    else if(query.get("playlist")){
                        data =  await axios.get(`/playlist/${query.get("playlist")}`,{headers:{
                            token:Cookie.get("token"),email:Cookie.get("email")
                        }})
                        Auth.setList(data.data)
                        // eslint-disable-next-line
                        Auth.setCounter(data.data.findIndex(e=>e.id==id))
                        setNextQuery(["playlist",query.get("playlist")])
                    }
                    else{
                        data =  await axios.get(`/top_songs`,{headers:{
                            token:Cookie.get("token"),email:Cookie.get("email")
                        }})
                        Auth.setList(data.data)
                        // eslint-disable-next-line
                        Auth.setCounter(data.data.findIndex(e=>e.id==id))
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
                const words= await solenolyrics.requestLyricsFor(Auth.song.title)
                setLyrics(words)
            }catch(e){}
        })()
    },[Auth.song])
    const spanStyle = { fontSize : 12 }
    return (
        Auth.song.title?
        <>
        <div className="oneSong">
            <div  className="playOneSong">  
            <h2>{Auth.song.title} </h2><hr style={{  border: "1.5px solid black"}}/>
            <span style={spanStyle}>by: &nbsp;{Auth.song.artist}</span>&nbsp;&nbsp;
            <span style={spanStyle}>album: &nbsp;{Auth.song.album}</span>
            <span style={spanStyle}> |&nbsp;{Auth.song.length.slice(3,10)}</span>
            <MyPlayer  />
            <div style={{width:"100%",height:"40%",overflowY:"scroll"}}>{lyrics}</div>
         </div> 
            <div className="queue">
                <h2>Queue</h2>
                {
                    Auth.list.map((item,index)=>{
                        item.title=item.song?item.song:item.title
                        return <SongItem background={item.title===Auth.song.title} animation={false} query={nextQuery} key={item.id+index}  oneSongProp={true} song={item} />
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
