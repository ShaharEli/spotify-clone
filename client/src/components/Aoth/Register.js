import React, { useState } from 'react'
import "./Register.css"
import {useForm} from "react-hook-form"
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Swal from "sweetalert2"
import {Redirect} from "react-router-dom"
import AuthApi from './AuthApi';
import {motion} from 'framer-motion'


function Register() {
    const Auth = React.useContext(AuthApi)
    const [goToLogin,setGoLogin] =useState(false)
    const [checked,setChecked] = useState(false)
    const {register,handleSubmit,errors} = useForm()
    const onSubmit = async values => {
      const ok= await axios.get(`/users/checkmail/${values.email}`)
      if(ok.data.emailOk){
        const name= await axios.post("/users/register",{...values,remember_token:checked})
        if(name.data.name){
          Auth.setAuth(true)
          Auth.setName(values.name)
          Auth.setEmail(values.email)
          Swal.fire("Welcome",`${values.name}`,"success")  
        }
      }else{
        Swal.fire("Email already exists","choose another one","error")
      }
    }
    return (
      !Auth.auth?
        <>
        <motion.div className="authForms"
        initial={{scale:0.03}}
         animate={{ scale: 1 }}
         transition={{ duration: 1.2}}
        >
        <motion.h1
        initial={{opacity:0,x:"120%"}}
        animate={{opacity:1,x:0,rotateY: 360  }}
        exit={{opacity:0}}
        transition={{
             default: { duration: 2 }
       }}
        style={{textAlign:"center"}}>Register</motion.h1>
        <motion.form
            initial={{opacity:0,x:"-120%"}}
            animate={{opacity:1,x:0,rotateY: 360 }}
            exit={{opacity:0}}
            transition={{
             default: { duration: 2 },
            }}    
         autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
          <div id="register">
          <label htmlFor="name">First name:</label>
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
            <input id="password" name="password" ref={register({required:"required",minLength:{value:6,message:"password should include atlist 6 letters"}})} placeholder="password" type="password"/>
           {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}<br/>
           <div
           >remember me: <input
           onClick={()=>setChecked(prev=>!prev)} type="checkbox" id="remember" name="remember"/></div><br/>
          
            <div
            >
            <Button
            type="submit" variant="contained" color="primary">register</Button> &nbsp;
            <Button onClick={()=>setGoLogin(true)}  variant="contained" color="inherit" >login</Button>
            {
                goToLogin&& <Redirect to="/login" />
            }
            </div>

            </div>
        </motion.form>
        </motion.div>
        </>:
        <Redirect to="/" />
         
    )
}

export default Register
