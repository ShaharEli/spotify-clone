import React from 'react'
import image from "./notfound.jpeg"
function NotFound() {
    return (
        <div>
            <img style={{width:"99vw",height:"100vh"}} alt="404 not found" src={image} />
        </div>
    )
}

export default NotFound
