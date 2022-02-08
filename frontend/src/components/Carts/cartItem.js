
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteCartstById,updateCarttById } from "../../reducer/cart/carts";

const CartItem = ({product,setTotal,total,getMyCart }) => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity,setQuantity]=useState("")


    const deleteCart = async (id) => {
        await axios
          .delete(`http://localhost:5000/carts/${id}`)
          .then((response) => {
            
            dispatch(deleteCartstById(id))
          })
          
      };

      const updateProduct = async (id) => {
        const body = {
            quantity,
        };
    
        try {
          await axios.put(`http://localhost:5000/carts/${id}`, body);
          dispatch(updateCarttById(body));
          getMyCart()
        } catch (error) {
          throw error;
        }
      };

      useEffect(() => {
       
        updateProduct(product.id)
      }, [quantity])

    
    return (
      <>
       <div key={product.id} className="addToCarts">
       
              <img
                    onClick={() => navigate(`/products/${product.id}`)}
                    src={product.image}
                    alt=""
                    className="floatImg"
                  />
                  
                 
                  
             
            
              <p>quantity:{product.quantity}</p>
             
              <input type="number"
              defaultValue={product.quantity}
              min="1"
             onChange={(e) => {
                setQuantity(e.target.value );
               
               
                
                
               
                
                
              }}/>
              
              <p className="priceColor quantity">price:{product.price}</p>
              <h2>{product.quantity*product.price}</h2>
             
              
              <button onClick={()=>{deleteCart(product.id)}} className="remove"><RiDeleteBinLine/></button>
             
            </div>
      </>
    );
  };
  
  export default CartItem;