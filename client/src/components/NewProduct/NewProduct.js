import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addproduct } from "../../reducer/products";
import axios from "axios";
import "./NewProduct.css";
import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../reducer/login/index";

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";
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
  const [allProducts, setAllProducts] = useState([]);

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
      .post("/products", product)
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
    getProductsNoLimit();
  });

  //====================================================
  const data = [
    {
      name: "Laptop",
      uv: 800,
      pv: 1400,
      amt: 1400,
      cnt: 800,
    },
    {
      name: "Mobile",
      uv: 700,
      pv: 1250,
      amt: 1250,
      cnt: 700,
    },
    {
      name: "TV",
      uv: 600,
      pv: 700,
      amt: 700,
      cnt: 600,
    },
    {
      name: "Wathces",
      uv: 900,
      pv: 1200,
      amt: 1200,
      cnt: 900,
    },
    {
      name: "Camera",
      uv: 650,
      pv: 900,
      amt: 900,
      cnt: 650,
    },
  ];

  //======================================
  const getProductsNoLimit = async () => {
    await axios
      .get(`/products`)
      .then((res) => {
        setAllProducts(res.data.result);
      })
      .catch((err) => {
        throw err;
      });
  };

  //===============================

  return (
    <>
      <div className="mainNewProduct">
        <div className="side">
          <div>
            
            <Link to="/productsTable" className="pro3">
              Products
            </Link>
          </div>
          <div>
            
            <Link to="/usersTable" className="pro3">
              Users
            </Link>
          </div>
          <div>
           
            <Link to="/newProduct" className="newProduct3">
              New Product
            </Link>
          </div>
          <div>
          
            <Link
              className="auth-button"
              onClick={() => {
                dispatch(logout());
                localStorage.clear();
                history("/login");
              }}
              to="/login"
            >
              Logout
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
          <div className="box-chart">
            <div className="first">
              <div className="two">
                <div>
                  <p>Products</p>
                </div>
                <div>
                  <p>{allProducts.length}</p>
                </div>
              </div>
            </div>
            <div className="second">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" scale="band" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="amt"
                    fill="#8884d8"
                    stroke="#8884d8"
                  />
                  <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                  <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                  <Scatter dataKey="cnt" fill="red" />
                </ComposedChart>
              </ResponsiveContainer>
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
