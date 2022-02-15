import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsHeart,BsCartPlus } from "react-icons/bs";
import Swal from "sweetalert2";

const Brand = () => {

  const [products, setProducts] = useState([]);
  const [elementId, setElementId] = useState([]);

  const [show, setShow] = useState(false);
  const { brand } = useParams();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return { token: state.loginReducer.token };

  })

  const getByBrand = () => {
    axios

      .get(`http://localhost:5000/products/brand/${brand}`)
      .then((result) => {
        setProducts(result.data.products);
        setShow(true);
      })
      .catch((err) => {
        throw err
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

      })
  }

  //======================================

  //=======================================
  const addToWishList = async (id) => {
    console.log(state.token);
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

  //======================================

  useEffect(() => {
    getByBrand();
  }, [brand]);

   ///////////////////////////////////////////////////////////////////////////////////////////

   const handlecolor = (element) => {
    setElementId([...elementId, element.id])
  };

  return (
    <>
      <div className="header">

        <div className="laptop-brand">
          {["Dell", "HP", "Lenovo"].includes(brand) ? (
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

          {["Apple", "Samsung", "Huawei"].includes(brand) ? (
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
          {["LG", "Sony", "TCL"].includes(brand) ? (
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

          {["Rolex", "Omega", "Blancpain"].includes(brand) ? (
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
          {["Canon", "Nikon", "DJI"].includes(brand) ? (
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





        {/* {////////////////////////////////////////////////////////////////////////////////////////} */}



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
                            <div class="h-bg">
                              <div class="h-bg-inner"></div>
                            </div>

                            <a class="cart h-bg">
                              <span class="price">{"$"+element.price}</span>

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



                                <BsCartPlus size={29} className='addToIcon'/>
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
      </div>
    </>
  );
};
export default Brand;
