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
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import Swal from "sweetalert2";
import{addcart} from"../../reducer/cart/carts";
////////////////////////////////////////////////////////////////////////////////////////////////////
//component Home
const Home = () => {
  const [message, setMessage] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [elementId, setElementId] = useState([]);


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
      .get(`http://localhost:5000/products/page?skip=${skip}&limit=8`)
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
        dispatch(addcart(res.data.result)) ;
      });
  };
  //=====================================================
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

  ///////////////////////////////////////////////////////////////////////////////////////////

  const handlecolor = (element) => {
    setElementId([...elementId, element.id])
  };

  return (
    <div>
      <div className="header">
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/4064826/pexels-photo-4064826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        />
        <div className="address">
          <h1 className="what">DIGITAL<br /> MARKETING</h1>
          <br />
          <p className="pNewCollection">NEW VERSION 2022</p>
        </div>
      </div>



      <div className="sliderSection">



        <div class="container1">
          <div class="slides-wrapper">
            <div class="img-container">
              <img src="https://images.pexels.com/photos/593324/pexels-photo-593324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
            <div class="img-container text">

              <img src="https://images.pexels.com/photos/7430733/pexels-photo-7430733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />

            </div>
            <div class="img-container">
              <img src="https://images.pexels.com/photos/6476373/pexels-photo-6476373.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" />
            </div>
          </div>

          <div class="slider">
            <div class="selected"></div>
            <button class="slider-button"></button>
            <button class="slider-button"></button>
            <button class="slider-button"></button>
          </div>
        </div>

      </div>



      <div className="section2">
        <div className="type-home">
          <span className="linkSize"
            onClick={() => {
              navigate(`/type/Laptop`);
              window.scrollTo(0, 300);
            }}
          >
            LAPTOP
          </span>
          <span className="linkSize"
            onClick={() => {
              navigate(`/type/TV`);
              window.scrollTo(0, 300);
            }}
          >
            TV
          </span>
          <span className="linkSize"
            onClick={() => {
              navigate(`/type/Mobile`);
              window.scrollTo(0, 300);
            }}
          >
            MOBILE
          </span>
          <span className="linkSize"
            onClick={() => {
              navigate(`/type/Watch`);
              window.scrollTo(0, 300);
            }}
          >
            WATCH
          </span>
          <span className="linkSize"
            onClick={() => {
              navigate(`/type/Camera`);
              window.scrollTo(0, 300);
            }}
          >
            CAMERA
          </span>
        </div>




        {/* /////////////////////////////////////////////////////////////////////////////////////// */}


        <div className="products">
          {show && state.products.map(element => {


            return (
              <div >

                <div class="container page-wrapper">
                  <div class="page-inner">
                    <div class="row">
                      <div class="el-wrapper">
                        <div class="box-up">
                          <img class="imgProduct" src={element.image} onClick={() => navigate(`/products/${element.id}`)}
                            alt="" />
                          <div class="img-info">

                            <div class="info-inner">
                            

                              <span className="add " onClick={() => {
                              addToWishList(element.id);

                            }}>
                              {elementId.includes(element.id) ? <BsHeart className="t1" onClick={() => {
                                Swal.fire({

                                  icon: 'success',
                                  title: 'Your work has been saved',
                                  showConfirmButton: false,
                                  timer: 1500
                                })

                                handlecolor(element)
                              }}
                                style={{ color: 'red' }}
                              /> : <BsHeart className="t1" id={element.id} onClick={() => {
                                handlecolor(element)
                              }}
                              />}
                            </span>
                            </div>


                          </div>
                        </div>

                        <div class="box-down">

                          <a class="cart h-bg">
                            <span class="price">{element.price}$</span>




                            <span class="p-name padName">
                              <span class="txt" onClick={() => {
                                Swal.fire({

                                  icon: 'success',
                                  title: 'Your work has been saved',
                                  showConfirmButton: false,
                                  timer: 1500
                                })

                                addToCart(element.id);
                              }}>



                                Add to cart
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
            )



          })}



        </div>
      </div>

      <div className="pagination">
        <h1 className="h1Pagination"
          onClick={() => {
            dec();
          }}
        >
          <BsFillArrowLeftCircleFill />
        </h1>
        <span className="pageNumber">{page}</span>
        <h1 className="h1Pagination"
          onClick={() => {
            inc();
          }}
        >
          <BsFillArrowRightCircleFill />
        </h1>


      </div>


      <div>
        <div className="aboutUs">
          <div className="float">
            <img
              className="imgAbout"
              src="https://images.pexels.com/photos/3563627/pexels-photo-3563627.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
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




    </div>
  );
};

export default Home;