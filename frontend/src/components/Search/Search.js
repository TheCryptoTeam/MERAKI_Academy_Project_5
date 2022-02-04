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

const Search = ({productName}) => {
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
        console.log(res.data.products);
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
console.log(state.products);
useEffect(() => {
    getProductByName(productName)
  }, [productName]);
  return (
    <div>
      <div>
        {/* <input
          className="search"
          placeholder="search..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          onKeyPress={(e) => {
            console.log(e.key);

            if (e.key === "Enter") {
              console.log(show);
              getProductByName();
            }
          }}
        /> */}

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
                    <button className="add">add to cart</button>
                    <button className="add">add to wishList</button>
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
