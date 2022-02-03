import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setcarts } from "../../reducer/cart/carts";

const Carts = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return { carts: state.cartsReducer.carts };
  });
  const [message,setMessage]=useState("")
  

  const getMyCart = async()=>{
  await axios.get("http://localhost:5000/carts")
  .catch((err) => {
    setMessage("The cart is empty");
    dispatch(setcarts([]))
   
    
  })
  .then(res=>{
    dispatch(setcarts(res.data.results))
    
  })
  

  }

  return (
  <>
  { state.carts.map((product,index)=>{
      return <div key={index} className="products">
         <p>{product.image}</p>
         <p>{product.quantity}</p>
      </div>
  })}
 <button onClick={getMyCart}>getMyCart</button>
 {message && <p>{message }</p>}
  </>
  );
};

export default Carts;
