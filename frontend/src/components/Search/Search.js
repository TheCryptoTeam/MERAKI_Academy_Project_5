import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setproducts,
  addproduct,
  updateproductById,
  deleteProductById,
} from "../../reducer/products";
import { useNavigate } from "react-router-dom";
import { BsHeart,BsCartPlus } from "react-icons/bs";
import Swal from "sweetalert2";
import "./Search.css";
import{addcart} from"../../reducer/cart/carts";
const Search = ({ productName }) => {
  const [elementId, setElementId] = useState([]);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [show, setShow] = useState(0);
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      products: state.productsReducer.products,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const getProductByName = async (productName) => {
    await axios
      .get(`http://localhost:5000/products/search_name?name=${productName}`)
      .then((res) => {
        if (!res.data.products[0]) {
          setShow(2);
        } else {
          dispatch(setproducts(res.data.products));
          setShow(1);
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  //=======================================
  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    let quantity = 1;
    await axios.post(`http://localhost:5000/carts/${id}`, { quantity }, { headers })
      .then((res) => {
        dispatch(addcart(res.data.result))
      })
  }

  //======================================

  //=======================================
  const addToWishList = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };

    await axios.post(`http://localhost:5000/wishList/${id}`, {}, { headers })
      .then((res) => {

      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getProductByName(productName)
  }, [productName]);



  /////////////////////////////
  const handlecolor = (element) => {
    setElementId([...elementId, element.id])
  };



  return (
    <div>
      <div>


        <div>
          {show == 1 ? (
            state.products.map((element, index) => {
              return (
              
                <div>

<div className="products">

<div class="container page-wrapper">
  <div class="page-inner">
    <div class="row">
      <div class="el-wrapper">
        <div class="box-up">
                            <img
                              class="imgProduct"
                              src={element.image}
                              onClick={() =>
                                navigate(`/products/${element.id}`)
                              }
                              alt=""
                            />
                            <div class="img-info">
                              <div class="info-inner">
                                <span
                                  className="add "
                                  onClick={() => {
                                    addToWishList(element.id);
                                  }}
                                >
                                  {elementId.includes(element.id) ? (
                                    <BsHeart
                                      className="t1"
                                      onClick={() => {
                                        Swal.fire({
                                          icon: "success",
                                          title: "Your work has been saved",
                                          showConfirmButton: false,
                                          timer: 1500,
                                        });

                                        handlecolor(element);
                                      }}
                                      style={{ color: "red" }}
                                    />
                                  ) : (
                                    <BsHeart
                                      className="t1"
                                      id={element.id}
                                      onClick={() => {
                                        handlecolor(element);
                                      }}
                                    />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

        <div class="box-down">

          <a class="cart h-bg">
            <span class="price">{"$"+element.price}</span>

            <span class="p-name padName">
                                <span
                                  class="txt"
                                  onClick={() => {
                                    Swal.fire({
                                      icon: "success",
                                      title: "Your work has been saved",
                                      showConfirmButton: false,
                                      timer: 1500,
                                    });

                                    addToCart(element.id);
                                  }}
                                >
                                  <BsCartPlus size={29} className="addToIcon" />
                                </span>
                                <span class="add-to-cart">{element.name}</span>
                              </span>


          
          </a>
        </div>
      </div>
    </div>
  </div>
</div>




</div>
                </div>
              );
            })
          ) : show == 2 ? (
            <>
            <img className="notFound" src="https://res.cloudinary.com/cryptoteam/image/upload/v1644926255/lpowmgomvblf3gcb7exj.svg"   alt="Not found !!" />
            
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
