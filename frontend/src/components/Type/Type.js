import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Type.css";
import { BsCartPlus } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

const Type = () => {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const state = useSelector((state) => {
    return { token: state.loginReducer.token };
  });

  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getByType();
  }, []);

  const { type } = useParams();

  const getByType = () => {
    axios

      .get(`http://localhost:5000/products/type/${type}`)
      .then((result) => {
        setProducts(result.data.products);
        setShow(true)
      })
      .catch((err) => {
        throw err;
      });
  };

  //============================
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
  //============================
  const addToWishList = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };

    await axios
      .post(`http://localhost:5000/wishList/${id}`, {}, { headers })
      .then((res) => {
        setMessage(res.data.massage);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //============================
  return (
    <>
      <div className="header">


        <div className="laptop-brand">
          {type === "Laptop" ? (
            <>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Dell`);
                }}
              >
                Dell
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/HP`);
                }}
              >
                HP
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Lenovo`);
                }}
              >
                Lenovo
              </span>
            </>
          ) : (
            <></>
          )}
          {type === "Mobile" ? (
            <>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Apple`);
                }}
              >
                Apple
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Samsung`);
                }}
              >
                Samsung
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Huawei`);
                }}
              >
                Huawei
              </span>
            </>
          ) : (
            <></>
          )}
          {type === "TV" ? (
            <>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/LG`);
                }}
              >
                LG
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Sony`);
                }}
              >
                Sony
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/TCL`);
                }}
              >
                TCL
              </span>
            </>
          ) : (
            <></>
          )}

          {type === "Watch" ? (
            <>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Rolex`);
                }}
              >
                Rolex
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Omega`);
                }}
              >
                Omega
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Blancpain`);
                }}
              >
                Blancpain
              </span>
            </>
          ) : (
            <></>
          )}
          {type === "Camera" ? (
            <>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Canon`);
                }}
              >
                Canon
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/Nikon`);
                }}
              >
                Nikon
              </span>
              <span className="linkSize"
                onClick={() => {
                  navigate(`/brand/DJI`);
                }}
              >
                DJI
              </span>
            </>
          ) : (
            <></>
          )}
        </div>

        <div>

          <div className="products">
            {show && products.map(element => {


              return (
                <div >

                  <div class="container page-wrapper">
                    <div class="page-inner">
                      <div class="row">
                        <div class="el-wrapper">
                          <div class="box-up">
                            <img class="img" src={element.image} onClick={() => navigate(`/products/${element.id}`)}
                              alt="" />
                            <div class="img-info">
                              <div class="info-inner">
                                <span class="p-name"></span>
                              </div>


                            </div>
                          </div>

                          <div class="box-down">
                            <div class="h-bg">
                              <div class="h-bg-inner"></div>
                            </div>

                            <a class="cart h-bg">
                              <span class="price">{element.price}$</span>

                              <span class="add-to-cart">
                                <span class="txt" onClick={() => {
                                  addToCart(element.id);
                                }}>



                                  Add to cart
                                </span>


                              </span>
                              <span className="add" onClick={() => {
                                addToWishList(element.id);
                              }}>
                                <BsHeart />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>




                </div>
              )



            })}



          </div>
        </div>

      </div>
    </>
  );
};
export default Type;


