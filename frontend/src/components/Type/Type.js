import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Type = () => {
  const [products, setProducts] = useState([]);
  const query = "phone";

  useEffect(() => {
    getByType();
  }, []);
  const getByType = () => {
    axios

      .get(`http://localhost:5000/products/search_type?type=${query}`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((err) => {
       throw err
      });
  };
  return (<>
  <div>
            {
                products.map((product, index) => {
                    return <div key={index} className="products">
                        <div className="product">
                            <p>name:{product.name}</p>
                            <p>price:{product.price}</p>
                            <button className="add">add to cart</button>
                            <button className="add">add to wishList</button>
                        </div><br/>
                    </div>

                })
            }</div>
  </>);
};
export default Type;
