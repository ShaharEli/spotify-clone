import React from 'react'
import "./About.css"
import Header from '../header/Header'
import Button from "@material-ui/core/Button"
import Cookie from "js-cookie"
import AuthApi from "../Aoth/AuthApi"


function About() {
    const Auth = React.useContext(AuthApi)
    const logout =async ()=>{
        await  Cookie.remove("email")
        await  Cookie.remove("name")
        await Cookie.remove("auth")
        Auth.setAuth(false)
    }   
    return (
        <>
        <Header />
        <div id="about">
        <div id="diagramTitle">
            <Button onClick={logout} variant="contained" color="secondary">Logout</Button>
        </div>
        </div>
        </>
    )
}

export default About
