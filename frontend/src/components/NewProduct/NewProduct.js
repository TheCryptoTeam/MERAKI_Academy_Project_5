import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {addproduct } from "../reducer/article";
import axios from "axios";

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

  const createNewProduct = async()=>{
    
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
      history("/dashboard");
    }
  });

  //===============================

  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

export default NewProduct;
