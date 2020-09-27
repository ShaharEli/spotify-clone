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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function useQuery() {    
    return new URLSearchParams(useLocation().search);
 }
function OneSong() {
    const Auth = React.useContext(AuthApi)
    const email = Cookie.get("email")
    let query = useQuery();
    const {id} = useParams()
    const [loading,setLoading]=  useState(true) 
    const [lyrics,setLyrics]=  useState("")
    const [liked,setLiked]=  useState(false)


    const handleLike =async()=>{
        try{
            const like = await axios.post("/favorites/likedSong",{song:Auth.song,email:Auth.email},{headers:{
                token:Cookie.get("token")
            }})
            setLiked(!liked)
        }catch(e){
            console.error(e.message)
        }
    }


    useEffect(()=>{
            (async ()=>{
                try{
                    let {data}= await axios.get(`/songs/${id}`,{headers:{
                        token:Cookie.get("token"),email:Cookie.get("email")
                    }})
                    Auth.setSong(data)
                    setLiked(data.isLiked)
                    if(query.get("artist")){
                        data =  await axios.get(`/artists/${query.get("artist")}`,{headers:{
                            token:Cookie.get("token")
                        }})
                        const listOfArtistSongs = data.data.Songs
                        Auth.setList(listOfArtistSongs)
                        // eslint-disable-next-line
                        Auth.setCounter(listOfArtistSongs.findIndex(e=>e.id==id))
                        Auth.setNextQuery(["artist",query.get("artist")])
                    }
                    else if(query.get("favorites")){           
                        data =  await axios.get(`/favorites/songs/${email}`,{headers:{
                            token:Cookie.get("token")
                        }})
                        data=data.data
                        let songsList = []
                        for (let i=0;i<data.length;i++){
                        // eslint-disable-next-line
                            if (songsList.find(element=>element.id===data[i].Song.id)){
                                continue
                            }
                            songsList.push(data[i].Song)        
                        }
                        Auth.setList(songsList)
                        Auth.setNextQuery(["favorites","true"])
                        

                    }
                    else if(query.get("album")){
                        data =  await axios.get(`/albums/${query.get("album")}`,{headers:{
                            token:Cookie.get("token")
                        }})
                        const listOfAlbumSongs =data.data.Songs
                        Auth.setList(listOfAlbumSongs)
                        // eslint-disable-next-line
                        Auth.setCounter(listOfAlbumSongs.findIndex(e=>e.id==id))
                        Auth.setNextQuery(["album",query.get("album")])
                    }
                    else if(query.get("playlist")){
                        data =  await axios.get(`/playlists/${query.get("playlist")}`,{headers:{
                            token:Cookie.get("token")
                        }})
                        data =data.data.Playlists_songs
                        Auth.setList(data)
                        // eslint-disable-next-line
                        Auth.setCounter(data.findIndex(e=>e.id==id))
                        Auth.setNextQuery(["playlist",query.get("playlist")])
                    }
                    else{
                        data =  await axios.get(`/songs/top`,{headers:{
                            token:Cookie.get("token")
                        }})
                        Auth.setList(data.data)
                        // eslint-disable-next-line
                        Auth.setCounter(data.data.findIndex(e=>e.id==id))
                        Auth.setNextQuery(["top_songs","true"])

                    }
                }catch(e){
                    if(e.response.status===403){
                        window.location.reload();
                    }
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
            }catch(e){console.error(`lyrics not found for ${Auth.song.title}`)}
        })()
    },[Auth.song])
    const spanStyle = { fontSize : 12 }
    return (
        Auth.song.title?
        <>
        <div id="oneSongForMobile">
        <div className="oneSong">
            <div  className="playOneSong">
            <div className="mainSong">
            <h2 >{Auth.song.title} </h2>
            <div style={{cursor:"pointer",textAlign:"right",width:"10px",float:"right"}} onClick={handleLike}>
                {
                    !liked?
                    <FavoriteBorderIcon />
                    :
                    <FavoriteIcon color="secondary"/>
                }
            </div>
            </div>  
            <hr style={{  border: "1.5px solid black"}}/>
            <span style={spanStyle}>by: &nbsp;{Auth.song.Artist["name"]}</span>&nbsp;&nbsp;
            <span style={spanStyle}>album: &nbsp;{Auth.song.Album["name"]}</span>
            <span style={spanStyle}> |&nbsp;{Auth.song.length.slice(3,10)}</span>
            <span style={spanStyle}> |&nbsp;viewes: {Auth.song.playCount+1}</span>
            <MyPlayer  />
            <div style={{width:"100%",height:"40%",overflowY:"scroll"}}>{lyrics}</div>
         </div> 
            <div className="queue">
                <h2>Queue</h2>
                {
                    Auth.list.map((item,index)=>{
                        item.title=item.song?item.song:item.title
                        return <SongItem background={item.title===Auth.song.title} animation={false} query={Auth.nextQuery} key={item.id+index}  oneSongProp={true} song={item} />
                    })
                }
            </div>
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
