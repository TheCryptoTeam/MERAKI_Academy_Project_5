import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setproducts,
  addproduct,
  updateproductById,
  deleteProductById,
} from "../../reducer/products";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [massage, setMessage] = useState("");
  // const [id,setId]=useState("")
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      products: state.productsReducer.products,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //getproductById

  const { id } = useParams();
  console.log(id);
  const getproductById = async () => {
    await axios
      .get(`http://localhost:5000/products/id/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.products);
        dispatch(setproducts(res.data.products));
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getproductById();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      dispatch(deleteProductById(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {state.products.map((product, index) => {
          return (
            <div key={index} className="products">
              <div className="product">
                <p>name:{product.name}</p>
                <p>price:{product.price}</p>
                <button
                  className="delete"
                  onClick={() => deleteProduct(product.id)}
                >
                  delete
                </button>
                <button className="add">add to cart</button>
                <button className="add">add to wishList</button>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
