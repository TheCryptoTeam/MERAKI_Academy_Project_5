import React, { useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import { addproduct } from "../../reducer/products";
import axios from "axios";
import "./NewProduct.css";
import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const NewProduct = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const { token, isLoggedIn } = state;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const createNewProduct = async (e) => {
    e.preventDefault();

    const product = {
      name,
      image,
      brand,
      type,
      description,
      price,
    };
    await axios
      .post("http://localhost:5000/products", product)
      .then((res) => {
        if (res.data.success) {
          setStatus(true);
          dispatch(addproduct(product));
          
          Swal.fire({
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          history("/home");
        }
      })
      .catch((err) => {
        setStatus(false);
        setMessage(err.response.data.massege);
      });
  };
  //=========================
  useEffect(() => {
    if (!isLoggedIn) {
      history("/home");
    }
  });

  //===============================

  return (
    <>
     <div className="mainNewProduct">
     <div className="side">
      <div>
        <h3  >Product</h3>
        <Link to="/productsTable" className="pro3">
          Products
        </Link>

      </div>
       <div>
       <h3>Users</h3>
        <Link to="/usersTable" className="pro3">
          Users
        </Link>
        </div>
        <div>
          <h3>New Product</h3>
        <Link to="/newProduct"  className="newProduct3">
          New Product
        </Link>
        </div>
      </div>
      <div className="name">
        <div>
          {" "}
          <h1>New Product </h1>
        </div>
        <div>
          <p>Create Product</p>
        </div>
      </div>
      <div className="create">
<div className="product-box">
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder=" Name "
                required=""
                style={{ textTransform: "capitalize" }}
              />

              <input
                type="text"
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                placeholder=" Brand"
                required=""
                style={{ textTransform: "capitalize" }}
              />
              <input
                type="text"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                placeholder=" Type"
                required=""
                style={{ textTransform: "capitalize" }}
              />
              <input
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder=" Price"
                required=""
                min={1}
                style={{ textTransform: "capitalize" }}
              />
              <input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder=" description"
                required=""
                style={{ textTransform: "capitalize" }}
              />
              <UploadFile setImage={setImage} />

              <div className="button-signIn">
                {" "}
                <button onClick={createNewProduct} id="signIn">
                  Create
                </button>
              </div>
            </div>
            </div>

     </div>
     
      
      {status
        ? message && <div>{message}</div>
        : message && <div>{message}</div>}
    </>
  );
};

export default NewProduct;
