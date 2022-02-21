import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteCartstById, updateCarttById } from "../../reducer/cart/carts";
import Swal from "sweetalert2";
const CartItem = ({ product, getMyCart }) => {
  const state = useSelector((state) => {
    return { total: state.cartsReducer.total };
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product?.quantity);

  const deleteCart = async (id) => {
    await axios.delete(`/carts/${id}`).then((response) => {
      dispatch(deleteCartstById(id));
      getMyCart();
    });
  };

  const updateProduct = async (id) => {
    const body = {
      quantity,
    };

    try {
      await axios.put(`/carts/${id}`, body);

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
          <div className="setQuantity">
            
          {product.quantity > 1 ? <button onClick={(e) => {
              setQuantity(--product.quantity);
            }}> &mdash;</button>: <span></span>}
          
          <h3>{product.quantity}</h3>
         
          {product.quantity < 9?<button onClick={(e) => {
              setQuantity(++product.quantity);
            }}> &#xff0b;</button>:  <span></span>}
          </div>
        </div>
        <div className="product-price-container">
          <p>Price</p>
          <h2>{"$"+product.price}</h2>
        </div>
        <div className="total-container">
          <p>Total</p>
          <h2>${product.quantity * product.price}</h2>
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
