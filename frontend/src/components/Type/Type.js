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
    console.log(state.token);
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
  console.log(brand);
  return (
    <>
     <div className="header">
        <img
          className="Imgtype"
          src="//cdn.shopify.com/s/files/1/2508/8420/files/4.jpg?v=1509680577"
        />
        <div className="address">
          <h1 className="what">
         PRODUCT
          </h1>
          <p className="pNewCollection">NEW COLLECTION 2022</p>
        </div>
        <div className="margin"></div>
        <div className="laptop-brand">
          {type === "Laptop" ? (
            <>
              <span 
                onClick={() => {
                  navigate(`/brand/Dell`);
                }}
              >
                Dell
              </span>
              <span
                onClick={() => {
                  navigate(`/brand/HP`);
                }}
              >
                HP
              </span>
              <span
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
              <span
                onClick={() => {
                  navigate(`/brand/Apple`);
                }}
              >
                Apple
              </span>
              <span
                onClick={() => {
                  navigate(`/brand/Samsung`);
                }}
              >
                Samsung
              </span>
              <span
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
              <span
                onClick={() => {
                  navigate(`/brand/LG`);
                }}
              >
                LG
              </span>
              <span
                onClick={() => {
                  navigate(`/brand/Sony`);
                }}
              >
                Sony
              </span>
              <span
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
              <span
                onClick={() => {
                  navigate(`/brand/Rolex`);
                }}
              >
                Rolex
              </span>
              <span
                onClick={() => {
                  navigate(`/brand/Omega`);
                }}
              >
                Omega
              </span>
              <span
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
              <span
                onClick={() => {
                  navigate(`/brand/Canon`);
                }}
              >
                Canon
              </span>
              <span
                onClick={() => {
                  navigate(`/brand/Nikon`);
                }}
              >
                Nikon
              </span>
              <span
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

        <div className="type">
          {products.map((product, index) => {
            return (
              <div key={index}>
                  <div className="product">
                    <img
                      onClick={() => navigate(`/products/${product.id}`)}
                      src={product.image}
                      alt=""
                    />
                    <div className="price">
                      <p> {product.name}</p>
                      <p className="priceColor"> {product.price}</p>
                    </div>
                    <div className="twoButton">
                      <button
                        className="add"
                        onClick={() => {
                          addToCart(product.id);
                        }}
                      >
                        <BsCartPlus />
                      </button>
                      <button
                        className="add"
                        onClick={() => {
                          addToWishList(product.id);
                        }}
                      >
                        <BsHeart />
                      </button>
                    </div>
                  </div>
                  <br />
                </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Type;

// {/* <div>

// {/* <select className="selectType" onChange={(e) => {
// navigate(`/brand/${e.target.value}`)

// }

// }>
// <option value="All" >All</option>
// <option value="dell">dell</option>
// <option value="samsung" >samsung</option>
// <option value="hp" >hp</option>

// </select> */}
// </div> */}
