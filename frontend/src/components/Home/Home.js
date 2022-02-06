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
import { BsBasket } from "react-icons/bs";
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
          src="https://images.pexels.com/photos/257894/pexels-photo-257894.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <div className="address">
          <h1 className="what">
            What is new <span className="year">2022</span> ?
          </h1>
          <p>Welcome to our website</p>
        </div>
      </div>
      <div className="section2">
        <div className="type-home">
          <img
            onClick={() => {
              navigate(`/type/laptop`);
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDe24g-hF3HSJNKpLBufd852zSsZOGi296Z4HrUEGREfL0S5UuadfU19i5mml_br8txUA&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => {
              navigate(`/type/mobile`);
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTog9_y0FmuFP6r-agy3zpFoSm0isRwn97XtAZSUf_ZxchAT2uhqRqiDsG0qiq28Ft7co&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => {
              navigate(`/type/TV`);
            }}
            src="https://digitalbachat.in/wp-content/uploads/2021/10/Upcoming-Smart-TV-1024x585.png"
            alt=""
          />
          <img
            onClick={() => {
              navigate(`/type/watches`);
            }}
            src="https://ae01.alicdn.com/kf/H855ead2118204396b7bf775177b5f7578/Luxury-Minimalist-Men-s-Fashion-Ultra-Thin-Watches-Simple-Men-Business-Stainless-Steel-Mesh-Belt-Quartz.jpg"
            alt=""
          />

          <img
            onClick={() => {
              navigate(`/type/camera`);
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaI7Bd-KbGkyDmhR6HKFMOQOTDI0Wzkz8rqA&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => {
              navigate(`/type/accessories`);
            }}
            src="https://www.espacocell.com.br/wp-content/uploads/2021/05/acessorios-para-celular-que-facilitam-a-vida-no-home-office-768x512.jpg"
            alt=""
          />

          {/* <select className="selecttype" onChange={(e) => {
                navigate(`/type/${e.target.value}`)

            }

            }>
                <option value="All" >All</option>
                <option value="apple">apple</option>
                <option value="samsung" >samsung</option>
                <option value="laptop" >laptop</option>


            </select> */}
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
                      <p>name : {product.name}</p>
                      <p>price : {product.price}</p>
                    </div>
                    <div className="twoButton">
                      <button
                        className="add"
                        onClick={() => {
                          addToCart(product.id);
                        }}
                      >
                        <BsBasket />
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
