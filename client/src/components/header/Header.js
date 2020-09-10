import React from 'react'
import "./Header.css"
import {Link} from "react-router-dom";
import {useSpring, animated} from 'react-spring'
function Header() {
    const fade = useSpring({
        from:{
            transform:"translateY(-10vh)",
            opacity:0,
        },
        to:{
            transform:"translateY(0)",
            opacity:1
        },delay:0,config:{duration:700}

    })
    return (
       <animated.header id="header" style={fade}>
         <Link style={{color:"blue",textDecoration:"none"}} to="/">
           <div className="title">
               <span>
                   Home
               </span>
           </div>
           </Link>
           <Link style={{color:"blue",textDecoration:"none"}} to="/about">
           <div className="title">
               <span>
                   About
               </span>
           </div>
           </Link>
           <Link style={{color:"blue",textDecoration:"none"}} to="/songs">
           <div className="title">
               <span>
                   Songs
               </span>
           </div>
           </Link>
           <Link style={{color:"blue",textDecoration:"none"}} to="/albums">
           <div className="title">
               <span>
                   Albums
               </span>
           </div>
           </Link>
           <Link style={{color:"blue",textDecoration:"none"}} to="/artists">
           <div className="title">
               <span>
                   Artists
               </span>
           </div>
           </Link>
           <Link style={{color:"blue",textDecoration:"none"}} to="/playlists">
           <div className="title">
               <span>
                   Playlists
               </span>
           </div>
           </Link>
       </animated.header>
    )
}

export default Header
