import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//redax

import { useSelector } from "react-redux";

// =================================================================

const Register = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role_id = "1";
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // =================================================================

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users", {
        userName,
        email,
        password,
        role_id,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage("The user has been created successfully");
        navigate("/login")
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.massage);
      }
      setMessage("Error happened while register, please try again");
    }
  };





  // =================================================================

  return (
    <>

      {!state.isLoggedIn ? (
        <>

          <div className="main-continar">
            <div className="login-continar">
              <div className="login-register">
                <div className="inner">
                  <span id="loginR" onClick={() => { navigate("/login") }}>Login</span>
                  <span id="registerR" >Register</span>
                </div>
              </div>
              <div className="login-box-out">
                <div className="login-box-inner">
                  <input
                    type="text"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    placeholder=" Name "
                    required=""
                  />
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

                  <div className="button-signIn"> <button onClick={addNewUser} id="signIn">Create</button></div>

                </div>
              </div>
              <div className="message"> {message ? <p className="ErrorMessage">{message}</p> : <></>} </div>
            </div>


          </div>

        </>
      ) : (
        <p>Logout First</p>
      )}

    </>
  );
};

export default Register;
