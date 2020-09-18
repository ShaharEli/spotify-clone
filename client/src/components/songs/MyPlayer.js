import React from 'react'
import ReactPlayer from 'react-player/youtube'


function MyPlayer({link,next,playing,play,pause}) {
    return (
        <ReactPlayer onEnded={next} onPlay={play} onPause={pause} playing={playing} controls={true}  url={link} width="96%" height="50%"/>

    )
}

export default MyPlayer
