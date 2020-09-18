import React from 'react'
import "./Login.css"
import {useForm} from "react-hook-form"
import Button from '@material-ui/core/Button';

function Login() {
    const {register,handleSubmit,errors} = useForm()
    const onSubmit = values => console.log(values);
    return (
        <>
        <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
          <div id="login">
            <label for="username">User name:</label>
            <input name="username" id="username" ref={register({required:"required",minLength:{
              value:6,
              message:"usename should include at list 6 letters"
            }})} placeholder="username"/>
           {errors.username && <span style={{color:"red"}}>{errors.username.message}</span>}<br/>
           <label for="password">Password:</label>
            <input id="password" name="password" ref={register({required:"required",minLength:{value:6,message:"password should include at list 6 letters"}})} placeholder="password" type="password"/>
           {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}<br/>
            <Button type="submit" variant="contained" color="primary">login</Button>
            </div>
        </form>
        </>
    )
}

export default Login
