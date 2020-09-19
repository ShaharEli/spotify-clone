import React from 'react'
import image from "./notfound.png"
import "./NotFound.css"
import {motion} from 'framer-motion'
import notFoundSong from "./lost404.mp3"
import Header from '../components/header/Header'


function NotFound() {

    return (
        <>
        <Header />
        <div id="notFoundMain">
              <audio src={notFoundSong} autoPlay  type="audio/mp3"/>
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
        </>
    )
}

export default NotFound
