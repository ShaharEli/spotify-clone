import React from 'react'
import "./About.css"
import Header from '../header/Header'
function About() {
    return (
        <>
        <Header />
        <div id="about">
        <h2 id="diagramTitle">
            This is the diagram i used for my database
        </h2>
        </div>
        {/* <iframe style={{width:"100%", height:"500px", boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", bordeRadius:15}} allowtransparency="true" allowFullScreen={true} scrolling="no" title="Embedded DrawSQL IFrame" frameBorder="0" src="https://drawsql.app/none-74/diagrams/spotify-clone/embed"/> */}
        </>
    )
}

export default About
