import React, { useState } from 'react'
import "./Login.css"
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Swal from "sweetalert2"
import {useForm} from "react-hook-form"
import AuthApi from "./AuthApi"
import Cookie from "js-cookie"

function Login() {
    const Auth = React.useContext(AuthApi)
    const [goToRegister,setGoToRegister] = useState(false)
    const {register,handleSubmit,errors} = useForm()
    const onSubmit = async values => {
         const {data} =  await axios.post("/login",values)
         if(data.name){
             Auth.setAuth(true)
             Auth.setName(data.name)
             Auth.setEmail(values.email)
             await Cookie.set("name",`${data.name}`)
             await Cookie.set("email",`${values.email}`)
             await Cookie.set("auth",`true`)
             Swal.fire("Welcome back",`${data.name}`,"success")           
         }else{
             Swal.fire("please try again","","error")
         }
    }
    return (
        !Auth.auth?
        <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
        <div id="login">
        <label htmlFor="email">Email:</label>
          <input id="email" name="email" ref={register({required:"required" ,pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "email not valid"
        }})} placeholder="email" type="text"/>
         {errors.email && <span style={{color:"red"}}>{errors.email.message}</span>}<br/>
         {errors.mail &&  <span style={{color:"red"}}>{errors.mail.message}</span>}<br/>
         <label htmlFor="password">Password:</label>
          <input id="password" name="password" ref={register({required:"required",minLength:{value:6,message:"password should include at list 6 letters"}})} placeholder="password" type="password"/>
         {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}<br/>
          <div>
          <Button type="submit" variant="contained" color="primary">login</Button> &nbsp;
          <Button  variant="contained" color="inherit" onClick={()=>setGoToRegister(true)} >Register</Button>
        </div>
            {
                goToRegister&& <Redirect to="/register" />
            }
        </div>
        </form>
        :
        <Redirect to="/" />
    )
}

export default Login
