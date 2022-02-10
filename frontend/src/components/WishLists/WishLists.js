import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setWishLists,deleteWishListById } from "../../reducer/wishLists";
import { useNavigate } from "react-router-dom";
const WishLists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      wishLists: state.wishListsReducer.wishLists,
      token: state.loginReducer.token,
    };
  });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const getMyWishLists = async () => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    await axios
      .get("http://localhost:5000/wishList", { headers })

      .then((res) => {
        if (res.data.results.length) {
          dispatch(setWishLists(res.data.results));
          console.log(res.data.results);
          setShow(true);
        }
      })
      .catch((err) => {
        setMessage("The wishLists is empty");
      });
  };

  //delete depend on product_id
  const deleteWishlist = async (id) => {
    await axios
      .delete(`http://localhost:5000/wishList/${id}`)
      .then((response) => {
        getMyWishLists ();
        dispatch(deleteWishListById(id))
      })
      
  };
  useEffect(() => {
    getMyWishLists()
  }, [])
  return (
    <>
      {show &&
        state.wishLists.map((product, index) => {
          return (
            <div key={index} className="products">
              <img
                    onClick={() => navigate(`/products/${product.id}`)}
                    src={product.image}
                    alt=""
                  />
              <p>price:{product.price}</p>
              <button onClick={()=>{
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                    deleteWishlist(product.id)
                  }
                })
                }}>delete</button>
            </div>
          );
        })}
     
      {message && <p>{message}</p>}
    </>
  );
};

export default WishLists;
