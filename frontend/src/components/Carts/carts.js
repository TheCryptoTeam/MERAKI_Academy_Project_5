import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setcarts,deleteCartstById } from "../../reducer/cart/carts";
import { useNavigate } from "react-router-dom";
import "./carts.css";

import CartItem from "./cartItem";


const Carts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[total,setTotal]=useState(0)
 
  const state = useSelector((state) => {
    return { carts: state.cartsReducer.carts, token: state.loginReducer.token };
  });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const getMyCart = async () => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    await axios
      .get("http://localhost:5000/carts", { headers })

      .then((res) => {
        if (res.data.results.length) {
          dispatch(setcarts(res.data.results));
          setShow(true);
        }
      })
      .catch((err) => {
        setMessage("The cart is empty");
      });
     

  };
  
  
  useEffect(() => {
    getMyCart()
  }, [])
 
  return (
    <>
      {show &&
        state.carts.map((product, index) => {
        
          return (

           <CartItem key={index} getMyCart={getMyCart } total={total} product={product} setTotal={setTotal} />

          );
        })}
        <div className="totalDiv">
              <h2>Total :</h2> <h2 className="total">$</h2>
              </div>
      {message && <p>{message}</p>}

    </>
  );
};

export default Carts;
