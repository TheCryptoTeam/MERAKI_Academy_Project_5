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

const Search = ({ productName }) => {
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
  return (
    <div>
      <div>


        <div>
          {show == 1 ? (
            state.products.map((product, index) => {
              return (
                <div key={index} className="products">
                  <div className="product">
                    <img
                      onClick={() => navigate(`/products/${product.id}`)}
                      src={product.image}
                      alt=""
                    />
                    <p>name:{product.name}</p>
                    <p>price:{product.price}</p>
                    <button className="add" onClick={() => { addToCart(product.id) }}>add to cart</button>
                    <button className="add" onClick={() => { addToWishList(product.id) }}>add to wishList</button>
                  </div>
                  <br />
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
