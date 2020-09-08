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
       <animated.header style={fade}>
         <Link style={{color:"blue",textDecoration:"none"}} to="/">
           <div className="title">
               <span>
                   Home
               </span>
           </div>
           </Link>
               
       </animated.header>
    )
}

export default Header
