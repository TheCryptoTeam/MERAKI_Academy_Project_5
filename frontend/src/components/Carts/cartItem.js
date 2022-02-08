
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteCartstById } from "../../reducer/cart/carts";

const CartItem = ({product,setInnerTotal,innerTotal}) => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity,setQuantity]=useState(1)


    const deleteCart = async (id) => {
        await axios
          .delete(`http://localhost:5000/carts/${id}`)
          .then((response) => {
            
            dispatch(deleteCartstById(id))
          })
          
      };
    
    return (
      <>
       <div key={product.id} className="addToCarts">
              <img
                    onClick={() => navigate(`/products/${product.id}`)}
                    src={product.image}
                    alt=""
                    className="floatImg"
                  />
                  
                 
                  
             
              
              <p>quantity:{quantity}</p>
              <input type="number"
             onChange={(e) => {
                setQuantity(e.target.value);
                setInnerTotal(quantity*product.price)
                
              }}/>
              
              <p className="priceColor quantity">price:{product.price}</p>
              <h2>{innerTotal}</h2>
              <button onClick={()=>{deleteCart(product.id)}} className="remove"><RiDeleteBinLine/></button>
             
            </div>
      </>
    );
  };
  
  export default CartItem;