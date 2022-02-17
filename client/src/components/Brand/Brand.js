import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BsHeart, BsCartPlus } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import { addcart } from "../../reducer/cart/carts";

const Brand = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [elementId, setElementId] = useState([]);

  const [show, setShow] = useState(false);
  const { brand } = useParams();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return { token: state.loginReducer.token };
  });

  const getByBrand = () => {
    axios

      .get(`/products/brand/${brand}`)
      .then((result) => {
        setProducts(result.data.products);
        setShow(true);
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
    await axios.post(`/carts/${id}`, { quantity }, { headers }).then((res) => {
      dispatch(addcart(res.data.result));
    });
  };

  //======================================

  //=======================================
  const addToWishList = async (id) => {
    console.log(state.token);
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };

    await axios
      .post(`/wishList/${id}`, {}, { headers })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  //======================================

  useEffect(() => {
    getByBrand();
  }, [brand]);

  ///////////////////////////////////////////////////////////////////////////////////////////

  const handlecolor = (element) => {
    setElementId([...elementId, element.id]);
  };

  return (
    <>
      <div className="header">
        <div className="laptop-brand">
          {["Dell", "HP", "Lenovo"].includes(brand) ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Dell`);
                }}
              >
                Dell
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/HP`);
                }}
              >
                HP
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Lenovo`);
                }}
              >
                Lenovo
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}

          {["Apple", "Samsung", "Huawei"].includes(brand) ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Apple`);
                }}
              >
                Apple
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Samsung`);
                }}
              >
                Samsung
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Huawei`);
                }}
              >
                Huawei
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}
          {["LG", "Sony", "TCL"].includes(brand) ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/LG`);
                }}
              >
                LG
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Sony`);
                }}
              >
                Sony
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/TCL`);
                }}
              >
                TCL
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}

          {["Rolex", "Omega", "Blancpain"].includes(brand) ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Rolex`);
                }}
              >
                Rolex
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Omega`);
                }}
              >
                Omega
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Blancpain`);
                }}
              >
                Blancpain
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}
          {["Canon", "Nikon", "DJI"].includes(brand) ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Canon`);
                }}
              >
                Canon
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Nikon`);
                }}
              >
                Nikon
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/DJI`);
                }}
              >
                DJI
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* {////////////////////////////////////////////////////////////////////////////////////////} */}

        <div>
          <div className="products">
            {show &&
              products.map((element) => {
                return (
                  <div>
                    <div className="container page-wrapper">
                      <div className="page-inner">
                        <div className="row">
                          <div className="el-wrapper">
                            <div className="box-up">
                              <img
                                className="imgProduct"
                                src={element.image}
                                onClick={() => {
                                  navigate(`/products/${element.id}`);
                                  window.scrollTo(0, 0);
                                }}
                                alt=""
                              />
                              <div className="img-info">
                                <div className="info-inner">
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

                            <div className="box-down">
                              <div className="h-bg">
                                <div className="h-bg-inner"></div>
                              </div>

                              <a className="cart h-bg">
                                <span className="price">{"$" + element.price}</span>

                                <span className="p-name padName">
                                  <span
                                    className="txt"
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
                                    <BsCartPlus
                                      size={29}
                                      className="addToIcon"
                                    />
                                  </span>
                                  <span className="add-to-cart">
                                    {element.name}
                                  </span>
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
        </div>
      </div>
    </>
  );
};
export default Brand;
