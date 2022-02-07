import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {addproduct } from  "../../reducer/products";
import axios from "axios";
import "./NewProduct.css";
import UploadFile from "./UploadFile"
import { useDispatch, useSelector } from "react-redux";

const NewProduct = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const { token, isLoggedIn } = state;

  const [name,setName]=useState("")
  const [image,setImage]=useState("")
  const [brand,setBrand]=useState("")
  const [type,setType]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const createNewProduct = async(e)=>{
    e.preventDefault();
    
   const product ={
    name, 
    image,
    brand,
    type,
    description,
    price
   }
   await axios.post("http://localhost:5000/products",product)
 .then((res)=>{
     
   if (res.data.success) {
    setStatus(true);
    dispatch(addproduct(product));
    setMessage(res.data.massege);
  }

 })
 .catch(err=>{
    setStatus(false);
    setMessage(err.response.data.massege);
 })

  }
  //=========================
  useEffect(() => {
    if (!isLoggedIn) {
      history("/home");
    }
  });

  //===============================

  return (
    <>
 <div className=".main-continar1">
      <div className="login-continar">
        <div className="login-register">
          {/* <div className="inner">
          <span id="loginR" onClick={()=>{navigate("/login")}}>Login</span>
          <span id="registerR" >Register</span>
          </div> */}
        </div>
        <div className="login-box-Product">
          <div className="login-box-inner">
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value)
              
            }}
            placeholder=" Name "
            required=""
            style={{textTransform:"capitalize"}}
          />
        
          <input
            type="text"
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            placeholder=" Brand"
            required=""
            style={{textTransform:"capitalize"}}
          />
          <input
            type="text"
            onChange={(e) => {
              setType(e.target.value);
            }}
            placeholder=" Type"
            required=""
            style={{textTransform:"capitalize"}}
          />
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder=" Price"
            required=""
            style={{textTransform:"capitalize"}}
          />
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder=" description"
            required=""
            style={{textTransform:"capitalize"}}
          />
          <UploadFile setImage={setImage}/>
          
          <div className="button-signIn"> <button onClick={createNewProduct} id="signIn">Create</button></div>

          </div>
        </div>
       <div className="message"> {message ? <p className="ErrorMessage">{message}</p> : <></>} </div> 
      </div>


    </div>



      <br />
      {status
        ? message && <div >{message}</div>
        : message && <div >{message}</div>}

    </>
  );
};

export default NewProduct;
