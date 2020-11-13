import React, { useState } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import AuthApi from "./AuthApi";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";

function Login() {
  const history = useHistory();
  const Auth = React.useContext(AuthApi);
  const [goToRegister, setGoToRegister] = useState(false);
  const [checked, setChecked] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (values) => {
    const { data } = await axios.post("/users/login", {
      ...values,
      remember_token: checked,
    });
    if (data.name) {
      Auth.setAuth(true);
      Auth.setName(data.name);
      Auth.setEmail(values.email);
      Swal.fire("Welcome back", `${data.name}`, "success");
      history.push("/");
    } else {
      Swal.fire("please try again", "", "error");
    }
  };
  return !Auth.auth ? (
    <>
      <div className='wallpaper'>
        <motion.div
          className='authForms'
          initial={{ scale: 0.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.h1
            initial={{ opacity: 0, x: "-120%" }}
            animate={{ opacity: 1, x: 0, rotateY: 360 }}
            exit={{ opacity: 0 }}
            transition={{
              default: { duration: 2 },
            }}
            style={{ textAlign: "center" }}
          >
            Sign in
          </motion.h1>
          <motion.form
            initial={{ opacity: 0, x: "120%" }}
            animate={{ opacity: 1, x: 0, rotateY: 360 }}
            exit={{ opacity: 0 }}
            transition={{
              default: { duration: 2 },
            }}
            autoComplete='true'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div id='login'>
              <TextField
                label='email'
                name='email'
                variant='outlined'
                inputRef={register({
                  required: "required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "email not valid",
                  },
                })}
              />
              {errors.email && (
                <>
                  <br />
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                </>
              )}
              <br />
              <TextField
                label='password'
                name='password'
                variant='outlined'
                inputRef={register({
                  required: "required",
                  minLength: {
                    value: 6,
                    message: "password should include atlist 6 letters",
                  },
                })}
                type='password'
              />
              {errors.password && (
                <>
                  <br />
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                </>
              )}
              <br />
              <div>
                remember me:{" "}
                <input
                  onClick={() => setChecked((prev) => !prev)}
                  type='checkbox'
                  id='remember'
                  name='remember'
                />
              </div>
              <br />
              <div>
                <Button type='submit' variant='contained' color='primary'>
                  login
                </Button>{" "}
                &nbsp;
                <Button
                  variant='contained'
                  color='inherit'
                  onClick={() => setGoToRegister(true)}
                >
                  Register
                </Button>
              </div>
              {goToRegister && <Redirect to='/register' />}
            </div>
          </motion.form>
        </motion.div>
      </div>
    </>
  ) : (
    <Redirect to='/' />
  );
}

export default Login;
