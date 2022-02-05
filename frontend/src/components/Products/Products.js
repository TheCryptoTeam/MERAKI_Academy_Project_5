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
import "./Products.css";
const Products = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  const [updateBox, setUpdateBox] = useState(false);
  const [productId, setProductId] = useState(false);

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

  const getproductById = async () => {
    await axios
      .get(`http://localhost:5000/products/id/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
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

  const handleUpdateClick = (product) => {
    setUpdateBox(!updateBox);
    setProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setBrand(product.brand);
    setType(product.type);
    setPrice(product.price);
    if (updateBox) updateProduct(product.id);
  };

  const updateProduct = async (id) => {
    const body = {
      name,
      type,
      brand,
      description,
      price,
    };

    try {
      await axios.put(`http://localhost:5000/products/${id}`, body);
      dispatch(updateproductById(body));
      getproductById();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <div>
        {state.products.map((product, index) => {
          return (
            <div key={index} className="productContainer">
              <div className="left-image">
                <img className="image" src={product.image} alt="image" />
              </div>
              <div className="productPage">
                <h1>{product.name}</h1>
                <h3>{product.brand}</h3>

                <h3>{product.type}</h3>
                <p>{product.description}</p>
                <h2 className="productPrice">{"$" + product.price}</h2>
                {updateBox && productId === product.id && (
                  <form>
                    <br />
                    <input
                      type="text"
                      defaultValue={product.name}
                      placeholder="Name here"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      defaultValue={product.brand}
                      placeholder="brand here"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <input
                      type="text"
                      defaultValue={product.type}
                      placeholder="type here"
                      onChange={(e) => setType(e.target.value)}
                    />
                    <br />

                    <textarea
                      placeholder="description here"
                      defaultValue={product.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <input
                      type="number"
                      defaultValue={product.price}
                      placeholder="Price here"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </form>
                )}
                <div className="product-buttons">
                  <button className="add">add to cart</button>
                  <button className="add">add to wishList</button>
                  <button
                    className="update"
                    onClick={() => handleUpdateClick(product)}
                  >
                    Update
                  </button>
                  <button
                    className="Delete"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
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
