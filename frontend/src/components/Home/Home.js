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
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import Swal from "sweetalert2";

////////////////////////////////////////////////////////////////////////////////////////////////////
//component Home
const Home = () => {
  const [message, setMessage] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [color, setColor] = useState("");
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

  ///////////////////////////////////////////////////////////////////////////////////////////

  const handlecolor = (element) => {
    setElementId([...elementId,element.id])
  };

  return (
    <div>
      <div className="header">
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/4064826/pexels-photo-4064826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        />
        <div className="address">
          <h1 className="what">PRODUCT</h1>
          <p className="pNewCollection">NEW COLLECTION 2022</p>
        </div>
      </div>



      <div className="sliderSection">



<div class="container1">
  <div class="slides-wrapper">
    <div class="img-container">
      <img src="https://i.ebayimg.com/images/g/h~UAAOSw9zhZ3XnE/s-l1600.jpg" alt=""/>
    </div>
    <div class="img-container text">
      <p>This is a slideshow made with pure CSS. <br/>You can´t control which image to see, but you can pause it by hovering over.</p>
    </div>
    <div class="img-container">
      <img src="https://data.whicdn.com/images/326092072/original.jpg?t=1548965962" alt=""/>
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
          {show&&state.products.map(element=>{


return(
  <div >

{/* <div className="section3"> */}
<div class="container page-wrapper">
  <div class="page-inner">
    <div class="row">
      <div class="el-wrapper">
        <div class="box-up">
          <img class="img" src={element.image}  onClick={() => navigate(`/products/${element.id}`)}
 alt=""/>
          <div class="img-info">
            <div class="info-inner">
              <span class="p-name"></span>
              {/* <span class="p-company">Yeezy</span> */}
            </div>
            <span className="add" onClick={() => {
              Swal.fire({
               
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
                          addToWishList(element.id);
                        }}> 
                        <BsHeart />
                      </span>
            <div class="a-size">Name : <span class="size">{element.name}</span></div>
           
          </div>
        </div>




            return (
              <div >

          <a class="cart">
            <span class="price">{element.price}$</span>

            <span class="add-to-cart">
              <span class="txt"    onClick={() => {
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

                     
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>


                {/* <div className="section3"> */}
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
                            <span className="add" onClick={() => {
                              addToWishList(element.id);

                            }}>
                              {elementId.includes(element.id)  ? <BsHeart onClick={() => {
                                handlecolor(element)
                              }}
                                style={{ color: 'red' }}
                              /> : <BsHeart id={element.id} onClick={() => {
                                handlecolor(element)
                              }}
                              style={{ color: 'black' }}
                              />}
                            </span>
                            <div class="a-size">Name : <span class="size">{element.name}</span></div>

                          </div>
                        </div>

                        <div class="box-down">
                          <div class="h-bg">
                            <div class="h-bg-inner"></div>
                          </div>

                          <a class="cart">
                            <span class="price">{element.price}$</span>

                            <span class="add-to-cart">
                              <span class="txt" onClick={() => {
                                addToCart(element.id);
                              }}>



                                Add to cart
                              </span>


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




    </div>
  );
};

export default Home;
