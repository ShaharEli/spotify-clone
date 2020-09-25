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


function OneArtist() {
    const {id} =useParams()
    const [artist,setArtist] = useState([])
    const [songs,setSongs] = useState([])
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
            const {data:artistData} = await axios.get(`/artists/${id}`,{headers:{
                token:Cookie.get("token")
            }})
            const dataToSet=artistData.Albums
            setArtist(artistData)
            setAlbums(dataToSet)
            setSongs(artistData.Songs)
            
            }catch(e){console.log(e.message)}
            setLoading(false)
        })()
    }, [id])
    
    return (
        artist.name?
        <>
        <div
        className="oneArtist">
        <h2>
            {
            artist.name
            }
        </h2>
        <img className="artistCoverImg" alt="" src={artist.coverImg}/>
        <h3>{artist.createdAt.slice(0,10)}</h3>
        <div className="artistMedia">
        <h2>{artist.name}`s Songs</h2>
        <Carousel itemsToShow={8} itemPadding={[10]}
             breakPoints={breakPoints}>
                 {
            songs.map(song=>{
                const songData = {album:song.Album.name,artistId:song.artistId, createdAt:song.createdAt, title:song.title,artist:song.name,length:song.length,youtubeLink:song.youtubeLink,albumId:song.albumId,id:song.id}
                return <TopSong oneArtist={true} query={["artist",id]} noImg={true} key={song.title} song={songData} maxWidth={true} />
            })

                 }
        </Carousel>
        <h2>{artist.name}`s Albums</h2>
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
