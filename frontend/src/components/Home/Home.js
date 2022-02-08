import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import {
  setproducts,
  addproduct,
  updateproductById,
  deleteProductById,
} from "../../reducer/products";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../reducer/login";
import { BsCartPlus } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

////////////////////////////////////////////////////////////////////////////////////////////////////
//component Home
const Home = () => {
  const [message, setMessage] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      products: state.productsReducer.products,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //  getAllProducts

  const getAllProducts = async () => {
    await axios
      .get(`http://localhost:5000/products/page?skip=${skip}&limit=3`)
      .then((res) => {
        dispatch(setproducts(res.data.result));

        setShow(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //

  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    console.log(headers);
    let quantity = 1;
    await axios
      .post(`http://localhost:5000/carts/${id}`, { quantity }, { headers })
      .then((res) => {
        setMessage(res.data.massage);
      });
  };
  //=====================================================
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getAllProducts();
  }, [skip]);

  const inc = () => {
    setSkip(skip + 3);
    setPage(page + 1);
  };
  const dec = () => {
    if (page > 1) {
      setSkip(skip - 3);
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className="header">
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940



          "
        />
        <div className="address">
          <h1 className="what">PRODUCT</h1>
          <p className="pNewCollection">NEW COLLECTION 2022</p>
        </div>
      </div>

      <div>
        <div className="aboutUs">
          <div className="float">
            <img
              className="imgAbout"
              src="https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
              "
            />
            <div className="pImg ">
              <div className="pad">
                <h1>About us</h1>
                <br />

                <p>
                  {" "}
                  this is a market to buy devices there is a lot of type of
                  devices that we have like laptop and watchs and other so get
                  started and login now to know more detailes about our website
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section2">
        <div className="type-home">
          <span
            onClick={() => {
              navigate(`/type/Laptop`);
              window.scrollTo(0, 300);
            }}
          >
            LAPTOP
          </span>
          <span
            onClick={() => {
              navigate(`/type/TV`);
              window.scrollTo(0, 300);
            }}
          >
            TV
          </span>
          <span
            onClick={() => {
              navigate(`/type/Mobile`);
              window.scrollTo(0, 300);
            }}
          >
            MOBILE
          </span>
          <span
            onClick={() => {
              navigate(`/type/Watch`);
              window.scrollTo(0, 300);
            }}
          >
            WATCH
          </span>
          <span
            onClick={() => {
              navigate(`/type/Camera`);
              window.scrollTo(0, 300);
            }}
          >
            CAMERA
          </span>
        </div>
        <div className="products">
          {show &&
            state.products.map((product, index) => {
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
          <div>
            <button
              onClick={() => {
                dec();
              }}
            >
              back
            </button>
            <span>{page}</span>
            <button
              onClick={() => {
                inc();
              }}
            >
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
