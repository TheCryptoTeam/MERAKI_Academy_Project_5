import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsCartPlus } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
const Brand = () => {
  
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const { brand } = useParams();
  const navigate = useNavigate();
  
    const state = useSelector((state) => {
        return { token: state.loginReducer.token};

    })

  const getByBrand = () => {
    axios

      .get(`http://localhost:5000/products/brand/${brand}`)
      .then((result) => {
        setProducts(result.data.products);
        console.log(result.data);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
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

    await axios.post(`http://localhost:5000/wishList/${id}`, {},{ headers })
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
          {["Dell","HP","Lenovo"].includes(brand) ? (
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

          { ["Apple","Samsung","Huawei"].includes(brand) ?  (
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
          {["LG","Sony","TCL"].includes(brand) ? (
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

          {["Rolex","Omega","Blancpain"].includes(brand)? (
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
          {["Canon","Nikon","DJI"].includes(brand) ? (
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
export default Brand;
