import React from 'react'
import ReactPlayer from 'react-player/youtube'
import AuthApi from '../Aoth/AuthApi';


function MyPlayer() {
    const Auth = React.useContext(AuthApi)

    return (
        <ReactPlayer volume={0} onEnded={Auth.next} onPlay={Auth.play} onPause={Auth.pause} playing={Auth.playing}  url={Auth.song.youtube_link} width="96%" height="50%"/>

    )
}

export default MyPlayer
