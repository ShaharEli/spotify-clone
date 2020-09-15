import React from 'react'
import image from "./notfound.png"
import "./NotFound.css"
import {motion} from 'framer-motion'

function NotFound() {
    return (
        
    

        <div id="notFoundMain">
                <motion.h1
        id="wtf"
         initial={{opacity:0,x:"7vw",y:"17vh"}}
        animate={{opacity:1,x:"60vw",y:"30vh"}}
                exit={{opacity:0}}
                transition={{
                    default: { duration: 3 },
                    
                }}
        >WTF</motion.h1>
            <img   style={{width:"60%",height:"89vh",paddingRight:60}} alt="404 not found" src={image} />
        </div>
        
    )
}

export default NotFound
