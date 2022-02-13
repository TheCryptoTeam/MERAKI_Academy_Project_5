import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RiDeleteBinLine } from "react-icons/ri";
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
      .get("http://localhost:5000/wishList", { headers })

      .then((res) => {
        if (res.data.results.length) {
          dispatch(setWishLists(res.data.results));
          console.log(res.data.results);
          setShow(true);
        }
      })
      .catch((err) => {
        setMessage("The Wishlists is empty");
      });
  };

  //delete depend on product_id
  const deleteWishlist = async (id) => {
    await axios
      .delete(`http://localhost:5000/wishList/${id}`)
      .then((response) => {
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
    await axios
      .post(`http://localhost:5000/carts/${id}`, { quantity }, { headers })
      .then((res) => {
        setMessage(res.data.massage);
      });
  };
  useEffect(() => {
    getMyWishLists();
  }, []);
  return (
    <>
      {/* {show &&
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
     
      {message && <p>{message}</p>} */}

      <div className="products">
        {show &&
          state.wishLists.map((element) => {
            return (
              <div>
                {/* <div className="section3"> */}
                <div class="container page-wrapper">
                  <div class="page-inner">
                    <div class="row">
                      <div class="el-wrapper">
                        <div class="box-up">
                          <img
                            class="img"
                            src={element.image}
                            onClick={() => navigate(`/products/${element.id}`)}
                            alt=""
                          />
                          <div class="img-info">
                            <div class="info-inner">
                              {/* <span class="p-name"></span> */}
                              {/* <span class="p-company">Yeezy</span> */}
                            </div>
                            {/* <span className="add" onClick={() => {
                          deleteWishlist(element.id);
                        }}> 
                       delete
                      </span> */}
                            {/* <RiDeleteBinLine
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
                            /> */}

                            {/* <div class="a-size">
                              Name : <span class="size">{element.name}</span>
                            </div> */}
                          </div>
                        </div>

                        <div class="box-down">
                          {/* <div class="h-bg">
                            <div class="h-bg-inner"></div>
                          </div> */}

                          <a class="cart">
                            <span class="price">{element.price}$</span>

                            <span class="add-to-cart">
                              <span class="txt"    onClick={() => {
                          addToCart(element.id);
                        }}>  
                       
                      
                      
                        Add to cart
                      </span>
                         
                      
                            </span>

                            <span>
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
            class="wishlist-icon"
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
