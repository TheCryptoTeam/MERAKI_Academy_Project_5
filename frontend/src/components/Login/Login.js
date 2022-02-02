import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//redax
import { login } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
//********************** */
const Login = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setmessage] = useState("");

  const navigate = useNavigate();
  const body = {
    email: email,
    password: password,
  };
  const register = () => {
    navigate("/register");
  };
  const loginUser = () => {
    //show backend server
    axios
      //send data from body object
      .post("http://localhost:5000/login", body)
      .then((result) => {
        dispatch(login(result.data.token));
        localStorage.setItem("userToken", result.data.token);
       
        navigate("/home");
      })
      .catch((err) => {
        //if error

        setmessage(err.response.data.message);
      });
  };
  return (
    <div className="authentication">
      
      <div className="authentication-form">
        
        <h1>Login</h1>
      
        <div className="authentication-inputs">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Email Address"
            required=""
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
            required=""
          />
          <button onClick={loginUser}>Login</button>
          {message ? <p className="error">{message}</p> : <></>}
        </div>

        <p>
          You don't have an account?{" "}
          <a className="no-account" onClick={register}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};
export default Login;