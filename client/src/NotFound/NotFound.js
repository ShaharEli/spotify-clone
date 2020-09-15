import React from 'react'
import image from "./notfound.png"
function NotFound() {
    return (
        <div style={{display:"flex",justifyContent:"center",width:"99vw"}}>
            <img style={{width:"60%",height:"88vh"}} alt="404 not found" src={image} />
        </div>
    )
}

export default NotFound
