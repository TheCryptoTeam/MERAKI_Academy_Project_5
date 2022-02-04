import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setcarts,deleteCartstById } from "../../reducer/cart/carts";

const Carts = () => {
  const dispatch = useDispatch();
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
  //delete depend on product_id
  const deleteCart = async (id) => {
    await axios
      .delete(`http://localhost:5000/carts/${id}`)
      .then((response) => {
        getMyCart ();
        dispatch(deleteCartstById(id))
      })
      
  };
 
  return (
    <>
      {show &&
        state.carts.map((product, index) => {
          return (
            <div key={index} className="products">
              <p>image: {product.image}</p>
              <p>quantity:{product.quantity}</p>
              <p>price:{product.price}</p>
              <button onClick={()=>{deleteCart(product.product_id)}}>X</button>
            </div>
          );
        })}
      <button onClick={getMyCart}>getMyCart</button>
      {message && <p>{message}</p>}
    </>
  );
};

export default Carts;
