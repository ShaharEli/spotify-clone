import React, { useState } from 'react'
import "./Register.css"
import {useForm} from "react-hook-form"
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Swal from "sweetalert2"
import {Redirect} from "react-router-dom"


function Register() {
    const [goToLogin,setGoLogin] =useState(false)
    const {register,handleSubmit,errors} = useForm()
    const onSubmit = async values => {
      console.log(values.email);
      const ok= await axios.get(`/checkmail/${values.email}`)
      if(ok.data.emailOk){
         axios.post("/user",values)
      }else{
        Swal.fire("Email already exists","choose another one","error")
      }
    }
    return (
        <>
        <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
          <div id="login">
          <label htmlFor="name">Name:</label>
            <input name="name" id="name" ref={register({required:"required",minLength:{
              value:2,
              message:"the name should be at list 2 letters"
            },pattern: {
              value: /^[a-z\u0590-\u05fe]+$/i,
              message: "the name should include only hebrew or english letters"
            }})} placeholder="name"/>
           {errors.name && <span style={{color:"red"}}>{errors.name.message}</span>}<br/>
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
            <Button type="submit" variant="contained" color="primary">register</Button> &nbsp;
            <Button onClick={()=>setGoLogin(true)}  variant="contained" color="inherit" >login</Button>
            {
                goToLogin&& <Redirect to="/login" />
            }
            </div>

            </div>
        </form>
        </>
    )
}

export default Register
