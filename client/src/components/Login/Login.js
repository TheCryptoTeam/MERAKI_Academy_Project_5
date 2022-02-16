import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import GoogleLogin from "react-google-login";

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
  const [userName1, setUserName1] = useState("");
  const onSuccess = (response) => {
    dispatch(login(response.tokenId));
    localStorage.setItem("userToken", response.tokenId);
    setUserName1(response.profileObj.name);

    setEmailGoogle(response.profileObj.email);
    localStorage.setItem("userName", response.profileObj.name);
    navigate("/home");

    addNewUserWithGoogle(response.profileObj.name, response.profileObj.email);
  };
  const onFailure = (response) => {
    console.log(response);
  };

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailGoogle, setEmailGoogle] = useState("");
  const [password, setPassword] = useState("");

  const [message, setmessage] = useState("");
  const role_id = "1";

  const navigate = useNavigate();

  const body = {
    email: email,
    password: password,
  };

  const loginUser = () => {
    //show backend server
    axios
      //send data from body object
      .post("/login", body)
      .then((result) => {
        dispatch(login(result.data.token));
        localStorage.setItem("userToken", result.data.token);
        localStorage.setItem("userName", result.data.userName);
        localStorage.setItem("myRole", result.data.role);
        localStorage.setItem("myUserId", result.data.userId);
        if (result.data.role === 2) {
          navigate("/ProductsTable");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        //if error
        setmessage(err);
      });

    //================================================================
  };

  const addNewUserWithGoogle = async (username, email) => {
    try {
      const result = await axios.post("/users", {
        userName: username,
        email: email,
        password: "123",
        role_id: "1",
      });
      if (result.data.success) {
        navigate("/home");
        body.email = email;
        body.password = "123";
        loginUser();
      }
    } catch (error) {
      body.email = email;
      body.password = "123";
      loginUser();
    }
  };
  return (
    <div className="main-continar">
      <div className="login-continar">
        <div className="login-register">
          <div className="inner">
            <span id="login">Login</span>
            <span
              id="register"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </span>
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
            {message ? <p className="Error">{message}</p> : <></>}{" "}
            <div className="button-signIn">
              <button onClick={loginUser} id="signIn">
                Login
              </button>
            </div>
            <br />
            <div className="orSection">
              <hr />
              <button>OR</button>
            </div>
            <GoogleLogin
              className="googleButton"
              clientId="284516947033-o1so93qbr9524dea3slu3ik2j01aqtpp.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <div className="message"> </div>
      </div>
    </div>
  );
};
export default Login;
