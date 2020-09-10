import React from 'react'
import "./Header.css"
import {Link} from "react-router-dom";
import {useSpring, animated} from 'react-spring'
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import HomeIcon from '@material-ui/icons/Home';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import InfoIcon from '@material-ui/icons/Info';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import PersonIcon from '@material-ui/icons/Person';
function Header() {
    const fade = useSpring({
        from:{
            transform:"translateY(-10vh)",
            opacity:0,
        },
        to:{
            transform:"translateY(0)",
            opacity:0.9
        },delay:0,config:{duration:700}

    })
    return (
       <animated.header id="header" style={fade}>
         <Link style={{color:"white",textDecoration:"none"}} to="/">
           <div className="title">
               <span>
                   Home &nbsp;
               </span>
               <HomeIcon/>
           </div>
           </Link>
           <Link style={{color:"white",textDecoration:"none"}} to="/about">
           <div className="title">
               <span>
                   About &nbsp;
               </span>
               <InfoIcon />

           </div>
           </Link>
           <Link style={{color:"white",textDecoration:"none"}} to="/songs">
           <div className="title">
               
                   Songs
                   <AudiotrackIcon/>

               
           </div>
           </Link>
           <Link style={{color:"white",textDecoration:"none"}} to="/albums">
           <div className="title">
               <span>
                   Albums &nbsp;
               </span>
               <LibraryMusicIcon />
           </div>
           </Link>
           <Link style={{color:"white",textDecoration:"none"}} to="/artists">
           <div className="title">
               <span>
                   Artists &nbsp;
               </span>
               <PersonIcon />
           </div>
           </Link>
           <Link style={{color:"white",textDecoration:"none"}} to="/playlists">
           <div className="title">
                   <span>Playlists &nbsp; </span>
                   <QueueMusicIcon/>
           </div>
           </Link>
       </animated.header>
    )
}

export default Header
