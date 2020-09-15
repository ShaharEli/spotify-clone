import React, { useEffect, useState } from 'react'
import {
    Link,
    useLocation,
    useParams
} from "react-router-dom";
import axios from "axios"
import NotFound from '../../NotFound/NotFound';
import Loading from '../loading/Loading';
function useQuery() {
    return new URLSearchParams(useLocation().search);
 }
function OneSong() {
    let query = useQuery();
    const {id} = useParams()
    const [song, setSong] = useState({})
    const [list, setList] = useState([]) 
    const [loading,setLoading]=  useState(true)

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
    return (
        song.title?
        <div>
            <h1>{song.title}</h1>
            
        </div>
        :
        !loading?
        <NotFound />
        :
        <Loading />

    )
}

export default OneSong
