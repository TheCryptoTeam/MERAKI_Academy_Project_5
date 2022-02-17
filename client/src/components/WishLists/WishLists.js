import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCartPlus } from "react-icons/bs";

import "./WishList.css";
import { setWishLists, deleteWishListById } from "../../reducer/wishLists";
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
      .get("/wishList", { headers })

      .then((res) => {
        if (res.data.results.length) {
          dispatch(setWishLists(res.data.results));
          setShow(true);
        }
      })
      .catch((err) => {
        setMessage("The Wishlists is empty");
      });
  };

  //delete depend on product_id
  const deleteWishlist = async (id) => {
    await axios.delete(`/wishList/${id}`).then((response) => {
      getMyWishLists();
      dispatch(deleteWishListById(id));
    });
  };

  //////////////////////////////////////////////////////////////////////////////////

  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    let quantity = 1;
    await axios.post(`/carts/${id}`, { quantity }, { headers }).then((res) => {
      setMessage(res.data.massage);
    });
  };
  useEffect(() => {
    getMyWishLists();
  }, []);
  return (
    <>
      <div className="products">
        {show &&
          state.wishLists.map((element) => {
            return (
              <div>
                <div className="container page-wrapper">
                  <div className="page-inner">
                    <div className="row">
                      <div className="el-wrapper">
                        <div className="box-up">
                          <img
                            className="imgProduct"
                            src={element.image}
                            onClick={() => navigate(`/products/${element.id}`)}
                            alt=""
                          />
                          <div className="img-info">
                            <div className="info-inner">
                              <span className="add">
                                <RiDeleteBinLine
                                  className="t1"
                                  size={30}
                                  id="delete"
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
                                        deleteWishlist(element.id);
                                      }
                                    });
                                  }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="box-down">
                          <a className="cart h-bg">
                            <span className="price">{element.price}$</span>

                            <span className="p-name padName">
                              <span
                                className="txt"
                                onClick={() => {
                                  addToCart(element.id);
                                }}
                              >
                                <BsCartPlus size={29} className="addToIcon" />
                              </span>
                            </span>

                            <span className="add">
                              <RiDeleteBinLine
                                className="add"
                                size={30}
                                id="delete"
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
                                      Swal.fire(
                                        "Deleted!",
                                        "Your file has been deleted.",
                                        "success"
                                      );
                                      deleteWishlist(element.id);
                                    }
                                  });
                                }}
                              />
                            </span>
                            <span className="add-to-cart">{element.name}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {message && (
        <div className="emptyWishlist">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 384 512"
            height="50"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
            className="wishlist-icon"
          >
            <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
          </svg>

          <h2>{message}</h2>
          <button
            className="continueShopping"
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </>
  );
};

export default WishLists;
