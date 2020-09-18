import React, { useState } from 'react'
import "./Login.css"
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Swal from "sweetalert2"
import {useForm} from "react-hook-form"


function Login() {
    const [goToRegister,setGoToRegister] = useState(false)
    const {register,handleSubmit,errors} = useForm()
    const onSubmit = async values => {
      console.log(values.email);
      const ok= await axios.get(`/checkmail/${values.email}`)
      if(ok.data.emailOk){
         const response =  axios.post("/user",values)
        console.log(response);
      }else{
        Swal.fire("Email already exists","choose another one","error")
      }
    }
    return (
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
    )
}

export default Login
