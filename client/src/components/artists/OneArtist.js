import React, { useState, useEffect } from 'react'
import "./OneArtist.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import NotFound from '../../NotFound/NotFound'
import Loading from '../loading/Loading'
import Carousel from 'react-elastic-carousel';
import TopSong from '../songs/TopSong'
import TopAlbum from '../albums/TopAlbum'

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
            const albumsData = await axios.get(`/albumByArtistId/${id}`)
            const dataToSet=albumsData.data.map(album=> {
                if(album.upload_at===null){
                    album.upload_at=generateTime()
                } 
                if(album.created_at===null){
                    album.created_at=generateTime()
                } 
                return album})
            setAlbums(dataToSet)
            
            }catch(e){console.log(e.message)}
            const {data} = await axios.get(`/artist/${id}`)
            data.map(artist=> {
                if(artist.artist_date===null){
                    artist.artist_date=generateTime()
                } else{
                    artist.artist_date=artist.artist_date.slice(0,10)
                }
                if(artist.upload_at===null){
                    artist.upload_at=generateTime()
                }
                return artist})
            setArtist(data)
            }catch(e){}
            setLoading(false)

        })()
    }, [id])
    
    return (
        artist.length>0?
        <div className="oneArtist">
        <h2>
            {
            artist[0].name
            }
        </h2>
        <img className="artistCoverImg" alt="" src={artist[0].cover_img}/>
        <h3>{artist[0].artist_date}</h3>
        <h2>{artist[0].name}`s Songs</h2>
        <Carousel itemsToShow={8} itemPadding={[10]}
             breakPoints={breakPoints}>
                 {
            artist.map(song=>{
                const songData = {album:song.album_name,artist_id:song.artist_id, upload_at:song.upload_at, title:song.title,artist:song.name,length:song.length,youtube_link:song.youtube_link,album_id:song.album_id,id:song.id}
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
        :
        loading?
        <Loading />
        :
         <NotFound />

    )
}

export default OneArtist
