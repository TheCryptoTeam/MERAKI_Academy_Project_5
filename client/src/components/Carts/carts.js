import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setcarts } from "../../reducer/cart/carts";
import { useNavigate } from "react-router-dom";
import "./carts.css";
import { subTotal } from "../../reducer/cart/carts";

import CartItem from "./cartItem";

const Carts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      carts: state.cartsReducer.carts,
      token: state.loginReducer.token,
      total: state.cartsReducer.total,
    };
  });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const getMyCart = async () => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    await axios
      .get("/carts", { headers })

      .then((res) => {
        if (res.data.results.length) {
          dispatch(setcarts(res.data.results));
          dispatch(subTotal(state.total));
          setShow(true);
        }
      })
      .catch((err) => {
        setMessage("The cart is empty");
      });
  };

  useEffect(() => {
    getMyCart();
  }, []);

  return (
    <div className="cartPage">
      {show &&
        state.carts.map((product, index) => {
          return (
            <CartItem key={index} getMyCart={getMyCart} product={product} />
          );
        })}
      {message ? (
        <div className="emptyContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <h2>{message}</h2>
          <button
            className="continueShopping"
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="totalDiv">
          <h2 className="totalMoney">
            Total : <span className="total">{"$" + state.total}</span>
          </h2>
          <button
            className="paymentBtn"
            onClick={() => {
              navigate("/payment");
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Carts;
