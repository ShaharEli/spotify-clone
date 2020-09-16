import React from 'react'
import "./Header.css"
import {NavLink} from "react-router-dom";
import {useSpring, animated} from 'react-spring'
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import HomeIcon from '@material-ui/icons/Home';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import InfoIcon from '@material-ui/icons/Info';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import PersonIcon from '@material-ui/icons/Person';
function Header({animate}) {
    const fade = useSpring({
        from:{
            transform:"translateY(-10vh)",
            opacity:0,
        },
        to:{
            transform:"translateY(0)",
            opacity:0.9
        },delay:800,config:{duration:1000}

    })
    return (
       <animated.header id="header" style={animate&&fade}>
         <NavLink style={{color:"white",textDecoration:"none"}} exact={true} activeStyle={{color:"orange"}} to="/">
           <div className="title">
               <span>
                   Home &nbsp;
               </span>
               <HomeIcon/>
           </div>
           </NavLink>
           <NavLink style={{color:"white",textDecoration:"none"}} activeStyle={{color:"#88DDFC"}} to="/songs">
           <div className="title">
               
                   Songs
                   <AudiotrackIcon/>

               
           </div>
           </NavLink>
           <NavLink style={{color:"white",textDecoration:"none"}} activeStyle={{color:"#88DDFC"}} to="/albums">
           <div className="title">
               <span>
                   Albums &nbsp;
               </span>
               <LibraryMusicIcon />
           </div>
           </NavLink>
           <NavLink style={{color:"white",textDecoration:"none"}} activeStyle={{color:"#88DDFC"}} to="/artists">
           <div className="title">
               <span>
                   Artists &nbsp;
               </span>
               <PersonIcon />
           </div>
           </NavLink>
           <NavLink style={{color:"white",textDecoration:"none"}} activeStyle={{color:"#88DDFC"}} to="/playlists">
           <div className="title">
                   <span>Playlists &nbsp; </span>
                   <QueueMusicIcon/>
           </div>
           </NavLink>
           <NavLink style={{color:"white",textDecoration:"none"}} activeStyle={{color:"#88DDFC"}} to="/about">
           <div className="title">
               <span>
                   About &nbsp;
               </span>
               <InfoIcon />
           </div>
           </NavLink>
       </animated.header>
    )
}

export default Header
