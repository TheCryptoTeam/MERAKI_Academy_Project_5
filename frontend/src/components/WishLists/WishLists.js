import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWishLists,deleteWishListById } from "../../reducer/wishLists";

const WishLists = () => {
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
console.log( state.wishLists);
  return (
    <>
      {show &&
        state.wishLists.map((product, index) => {
          return (
            <div key={index} className="products">
              <p>image:{product.image}</p>
              <p>price:{product.price}</p>
              <button onClick={()=>{deleteWishlist(product.product_id)}}>X</button>
            </div>
          );
        })}
      <button onClick={getMyWishLists}>getMyWishLists</button>
      {message && <p>{message}</p>}
    </>
  );
};

export default WishLists;
