import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteCartstById, updateCarttById } from "../../reducer/cart/carts";
import Swal from "sweetalert2";
const CartItem = ({ product,  getMyCart }) => {
  const state = useSelector((state) => {
    return { total: state.cartsReducer.total };
  
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");

  const deleteCart = async (id) => {
    await axios.delete(`http://localhost:5000/carts/${id}`).then((response) => {
      dispatch(deleteCartstById(id));
      getMyCart();
    });
  };

  const updateProduct = async (id) => {
    const body = {
      quantity,
    };

    try {
      await axios.put(`http://localhost:5000/carts/${id}`, body);
      
      dispatch(updateCarttById(body));
      
       
      getMyCart();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    updateProduct(product.id);
   
  
  }, [quantity]);

  
  return (
    <>
      <div key={product.id} className="addToCarts">
        <img
          onClick={() => navigate(`/products/${product.id}`)}
          src={product.image}
          alt=""
          className="floatImg"
        />

        <div className="quantity-container">
          <p>Quantity</p>

          <input
            type="number"
            defaultValue={product.quantity}
            min="1"
            onChange={(e) => {
              setQuantity(e.target.value);
              
            
            }}
          />
        </div>
        <div className="product-price-container">
          <p>Product Price</p>
          <h2>{product.price}</h2>
        </div>
        <div className="total-container">
          <p>Total</p>
          <h2 >{product.quantity * product.price}</h2>
        </div>

        <button
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                deleteCart(product.id);
              }
            });
          }}
          className="remove"
        >
          <RiDeleteBinLine /> Delete
        </button>
      </div>
    </>
  );
};

export default CartItem;
