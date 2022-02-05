import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
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
  }, []);

  return (
    <>
      <div>
        {show &&
          products.map((product, index) => {
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
          })}
      </div>
    </>
  );
};
export default Brand;
