import React, { useState, useEffect } from 'react'
import "./OneArtist.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import NotFound from '../../NotFound/NotFound'
import Loading from '../loading/Loading'
import Carousel from 'react-elastic-carousel';
import TopSong from '../songs/TopSong'
import TopAlbum from '../albums/TopAlbum'
import Cookie from "js-cookie"
function generateTime() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return `${today}`;
  }

function OneArtist() {
    const {id} =useParams()
    const [artist,setArtist] = useState([])
    const [albums,setAlbums] = useState([])
    const [loading,setLoading] =useState(true)

      const breakPoints = [
        { width: 270, itemsToShow: 2 },
        { width: 371, itemsToShow: 3 },
        { width: 485, itemsToShow: 4 },
        { width: 565, itemsToShow: 5 },
        { width:630 , itemsToShow: 6 },
        { width:730 , itemsToShow: 7 },
        { width: 950, itemsToShow: 8 },
      ]
    useEffect(() => {
        (async ()=>{
            try{
            try{
            const albumsData = await axios.get(`/albumByArtistId/${id}`,{headers:{
                token:Cookie.get("token"),email:Cookie.get("email")
            }})
            const dataToSet=albumsData.data.map(album=> {
                if(album.uploadAt===null){
                    album.uploadAt=generateTime()
                } 
                if(album.createdAt===null){
                    album.createdAt=generateTime()
                } 
                return album})
            setAlbums(dataToSet)
            
            }catch(e){console.log(e.message)}
            const {data} = await axios.get(`/artist/${id}`)
            data.map(artist=> {
                if(artist.artistDate===null){
                    artist.artistDate=generateTime()
                } else{
                    artist.artistDate=artist.artistDate.slice(0,10)
                }
                if(artist.uploadAt===null){
                    artist.uploadAt=generateTime()
                }
                return artist})
            setArtist(data)
            }catch(e){}
            setLoading(false)

        })()
    }, [id])
    
    return (
        artist.length>0?
        <>
        <div
        className="oneArtist">
        <h2>
            {
            artist[0].name
            }
        </h2>
        <img className="artistCoverImg" alt="" src={artist[0].coverImg}/>
        <h3>{artist[0].artistDate}</h3>
        <div className="artistMedia">
        <h2>{artist[0].name}`s Songs</h2>
        <Carousel itemsToShow={8} itemPadding={[10]}
             breakPoints={breakPoints}>
                 {
            artist.map(song=>{
                const songData = {album:song.albumName,artistId:song.artistId, uploadAt:song.uploadAt, title:song.title,artist:song.name,length:song.length,youtubeLink:song.youtubeLink,albumId:song.albumId,id:song.id}
                return <TopSong oneArtist={true} query={["artist",id]} noImg={true} key={song.title} song={songData} maxWidth={true} />
            })

                 }
        </Carousel>
        <h2>{artist[0].name}`s Albums</h2>
        <Carousel itemsToShow={8} itemPadding={[10]} breakPoints={breakPoints}>
            {
            albums.map((album)=><TopAlbum key={album.id} album={album} />)
            } 
         </Carousel>
        </div>
        </div>
        </>
        :
        loading?
        <Loading />
        :
         <NotFound />

    )
}

export default OneArtist
