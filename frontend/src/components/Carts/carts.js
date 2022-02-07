import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setcarts,deleteCartstById } from "../../reducer/cart/carts";
import { useNavigate } from "react-router-dom";
import "./carts.css";
import { RiDeleteBinLine } from "react-icons/ri";


const Carts = () => {
  const navigate = useNavigate();
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
  
  const deleteCart = async (id) => {
    await axios
      .delete(`http://localhost:5000/carts/${id}`)
      .then((response) => {
        getMyCart ();
        dispatch(deleteCartstById(id))
      })
      
  };
  useEffect(() => {
    getMyCart()
  }, [])
 
  return (
    <>
      {show &&
        state.carts.map((product, index) => {
          return (
            <div key={index} className="addToCarts">
              <img
                    onClick={() => navigate(`/products/${product.id}`)}
                    src={product.image}
                    alt=""
                    className="floatImg"
                  />
                  <h3>{product.name}</h3>
                  <div className="quantity">
              <p>quantity:{product.quantity}</p>
              <p className="priceColor">price:{product.price}</p>
              <button onClick={()=>{deleteCart(product.id)}} className="remove"><RiDeleteBinLine/></button>
              </div>
            </div>
          );
        })}
      
      {message && <p>{message}</p>}
    </>
  );
};

export default Carts;
