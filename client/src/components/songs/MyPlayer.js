import React from 'react'
import ReactPlayer from 'react-player/youtube'


function MyPlayer({link}) {
    return (
        <ReactPlayer url={link} width="96%" height="50%" onPlay={()=>console.log("Dcds")}/>

    )
}

export default MyPlayer
