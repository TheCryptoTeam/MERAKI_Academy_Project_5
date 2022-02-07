import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import GoogleLogin from 'react-google-login';

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
    

    const onSuccess = (response) => {
      console.log(response);
      dispatch(login(response.tokenId));
        localStorage.setItem("userToken", response.tokenId);
        localStorage.setItem("userName", response.Du.VX);
        navigate("/home");
        console.log(state.token);
     }
   const onFailure =(response)=>{
    console.log(response);
    }

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setmessage] = useState("");

  const navigate = useNavigate();
  
  
  const body = {
    email: email,
    password: password,
  };
  // const register = () => {
  //   navigate("/register");
  // };
  const loginUser = () => {
    //show backend server
    axios
      //send data from body object
      .post("http://localhost:5000/login", body)
      .then((result) => {
        dispatch(login(result.data.token));
        localStorage.setItem("userToken", result.data.token);
        localStorage.setItem("userName", result.data.userName);
        navigate("/home");
      })
      .catch((err) => {
        //if error

        setmessage(err.response.data.message);
      });
  };
  return (
    <div className="main-continar">
      <div className="login-continar">
        <div className="login-register">
          <div className="inner">
          <span id="login">Login</span>
          <span id="register" onClick={()=>{navigate("/register")}}>Register</span>
          </div>
        </div>
        <div className="login-box-out">
          <div className="login-box-inner">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder=" Email "
            required=""
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder=" Password"
            required=""
          />
          
          <div className="button-signIn">
          <GoogleLogin
    clientId="284516947033-o1so93qbr9524dea3slu3ik2j01aqtpp.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
  />,
             <button onClick={loginUser} id="signIn">sign in</button></div>

          </div>
        </div>
       <div className="message"> {message ? <p className="ErrorMessage">{message}</p> : <></>} </div> 
      </div>


    </div>
    // <div className="authentication">
      
    //         <p className="Title">Login:</p>
    

    //     <div className="authentication-inputs">
    //       <label>Email</label>
    //       <input
    //         type="email"
    //         onChange={(e) => {
    //           setEmail(e.target.value);
    //         }}
    //         placeholder="Enter Email Address"
    //         required=""
    //       />
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         onChange={(e) => {
    //           setPassword(e.target.value);
    //         }}
    //         placeholder="Enter Password"
    //         required=""
    //       />
    //       <button onClick={loginUser}>Login</button>
    //       {message ? <p className="ErrorMessage">{message}</p> : <></>}
    //     </div>

    //     <p>
    //       You don't have an account?{" "}
    //       <a className="no-account" onClick={register}>
    //         Register
    //       </a>
    //     </p>
    //   </div>
  
  );
};
export default Login;
