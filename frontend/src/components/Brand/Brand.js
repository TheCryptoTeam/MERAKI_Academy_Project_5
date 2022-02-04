import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Brand = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const { brand } = useParams();
  const navigate = useNavigate();

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
