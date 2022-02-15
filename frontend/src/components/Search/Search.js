import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setproducts,
  addproduct,
  updateproductById,
  deleteProductById,
} from "../../reducer/products";
import { useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import Swal from "sweetalert2";

const Search = ({ productName }) => {
  const [elementId, setElementId] = useState([]);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [show, setShow] = useState(0);
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      products: state.productsReducer.products,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const getProductByName = async (productName) => {
    await axios
      .get(`http://localhost:5000/products/search_name?name=${productName}`)
      .then((res) => {
        if (!res.data.products[0]) {
          setShow(2);
        } else {
          dispatch(setproducts(res.data.products));
          setShow(1);
        }
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
    await axios.post(`http://localhost:5000/carts/${id}`, { quantity }, { headers })
      .then((res) => {

      })
  }

  //======================================

  //=======================================
  const addToWishList = async (id) => {
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

  useEffect(() => {
    getProductByName(productName)
  }, [productName]);



  /////////////////////////////
  const handlecolor = (element) => {
    setElementId([...elementId, element.id])
  };



  return (
    <div>
      <div>


        <div>
          {show == 1 ? (
            state.products.map((element, index) => {
              return (
              
                <div>

<div className="products">

<div class="container page-wrapper">
  <div class="page-inner">
    <div class="row">
      <div class="el-wrapper">
        <div class="box-up">
          <img class="imgProduct" src={element.image} onClick={() => navigate(`/products/${element.id}`)}
            alt="" />
          <div class="img-info">
            <div class="info-inner">
              <span class="p-name padName">{element.name}</span>
            </div>


          </div>
        </div>

        <div class="box-down">

          <a class="cart h-bg">
            <span class="price">{element.price}$</span>

            <span className="add" onClick={() => {
              addToWishList(element.id);

            }}>
              {elementId.includes(element.id) ? <BsHeart onClick={() => {
                Swal.fire({

                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                })

                handlecolor(element)
              }}
                style={{ color: 'red' }}
              /> : <BsHeart id={element.id} onClick={() => {
                handlecolor(element)
              }}
              />}
            </span>


            <span class="add-to-cart">
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


            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>




</div>
                </div>
              );
            })
          ) : show == 2 ? (
            <>
              <p>Not found !!</p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
