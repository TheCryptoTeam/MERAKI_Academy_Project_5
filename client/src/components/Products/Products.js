import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setproducts,
  
} from "../../reducer/products";
import {   useParams } from "react-router-dom";
import "./Products.css";
import Comment from "./Comment";
import Rating from "./Rating";
import Swal from "sweetalert2";
import { BsHeart } from "react-icons/bs";
import { addcart } from "../../reducer/cart/carts";

const Products = () => {
 

  
  const [elementId, setElementId] = useState([]);
  

  
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      products: state.productsReducer.products,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //getproductById

  const { id } = useParams();

  const getproductById = async () => {
    await axios
      .get(`/products/id/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        dispatch(setproducts(res.data.products));
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getproductById();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////



  const addToWishList = async (id) => {
    
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };

    await axios
      .post(`/wishList/${id}`, {}, { headers })
      .then((res) => {
        
      })
      .catch((err) => {
        throw err;
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    
    let quantity = 1;
    await axios.post(`/carts/${id}`, { quantity }, { headers }).then((res) => {
      dispatch(addcart(res.data.result));
    });
  };

 
  const handlecolor = (element) => {
    setElementId([...elementId, element.id]);
  };
  return (
    <div>
      <div className="gridProduct">
        <div>
          {state.products.map((product, index) => {
            return (
              <div key={index}>
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div id="container">
                  <div className="product-details">
                    <h1>{product.name}</h1>

                    <span className=" addTo">
                      {" "}
                      {elementId.includes(product.id) ? (
                        <BsHeart
                          width={30}
                          onClick={() => {
                            addToWishList(product.id)
                            handlecolor(product);
                          }}
                          style={{ color: "red" }}
                        />
                      ) : (
                        <BsHeart
                          size={30}
                          id={product.id}
                          onClick={() => {
                            addToWishList(product.id)
                            handlecolor(product);
                          }}
                          style={{ color: "black" }}
                        />
                      )}
                    </span>
                    <br />
                    <span className="hint-star star">
                      <Rating />
                    </span>

                    <p className="information">{product.description}</p>

                    <div className="control">
                      <button className="btn">
                        <span className="price">{"$" + product.price}</span>
                        <span className="shopping-cart">
                          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </span>
                        <span
                          className="buy"
                          onClick={() => {
                            Swal.fire({
                              icon: "success",
                              title: "Your work has been saved",
                              showConfirmButton: false,
                              timer: 1500,
                            });

                            addToCart(product.id);
                          }}
                        >
                          add to cart
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="product-image">
                    <img src={product.image} alt="" />

                    <div className="info">
                      <h2> Detailes</h2>
                      <ul>
                        <li>
                          <strong>Brand : </strong>
                          {product.brand}{" "}
                        </li>
                        <li>
                          <strong>Type : </strong>
                          {product.type}
                        </li>
                        <li>
                          <strong>Price: </strong>
                          {"$"+product.price}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
             
            );
          })}
        </div>
        <div className="paddBIgDiv">
          {" "}
          <Comment id={id} />
        </div>
      </div>
    </div>
  );
};

export default Products;
