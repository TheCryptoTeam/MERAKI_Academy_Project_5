import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Brand = () => {
  const [products, setProducts] = useState([]);
  const query = "gg";

  useEffect(() => {
    getByBrand();
  }, []);
  const getByBrand = () => {
    axios

      .get(`http://localhost:5000/products/search_brand?brand=${query}`)
      .then((result) => {
        setProducts(result.data.products);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        {products.map((product, index) => {
          return (
            <div key={index} className="products">
              <div className="product">
                <p>name:{product.name}</p>
                <p>price:{product.price}</p>
                <button className="add">add to cart</button>
                <button className="add">add to wishList</button>
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
