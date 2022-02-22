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

  

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [tvs, setTVs] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [watches, setWatches] = useState([]);
  const [camera, setcamera] = useState([]);

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
          getProductsNoLimit();
          categories();

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

  //====================================
  const getLaptosp = () => {
    axios

      .get(`/products/type/laptop`)
      .then((result) => {
        setLaptops(result.data.products);
      })
      .catch((err) => {
        throw err;
      });
  };

  //=======================================
  const getTVs = () => {
    axios

      .get(`/products/type/TV`)
      .then((result) => {
        setTVs(result.data.products);
      })
      .catch((err) => {
        throw err;
      });
  };
  //==================================================
  const getMobiles = () => {
    axios

      .get(`/products/type/mobile`)
      .then((result) => {
        setMobiles(result.data.products);
      })
      .catch((err) => {
        throw err;
      });
  };
  //========================================================
  const getWathces = () => {
    axios

      .get(`/products/type/watch`)
      .then((result) => {
        setWatches(result.data.products);
      })
      .catch((err) => {
        throw err;
      });
  };
  //========================================================
  const getcamera = () => {
    axios

      .get(`/products/type/camera`)
      .then((result) => {
        setcamera(result.data.products);
      })
      .catch((err) => {
        throw err;
      });
  };

  //=============================
  const categories = () => {
    getLaptosp();
    getTVs();
    getMobiles();
    getWathces();
    getcamera();
  };
  //=========================
  useEffect(() => {
    getProductsNoLimit();
    categories();
  }, []);

  //====================================================
  const data = [
    {
      name: "Laptop",
      uv: 8,
      pv: laptops.length,
      amt: laptops.length,
      cnt: 8,
    },
    {
      name: "Mobile",
      uv: 7,
      pv: mobiles.length,
      amt: mobiles.length,
      cnt: 7,
    },
    {
      name: "TV",
      uv: 6,
      pv: tvs.length,
      amt: tvs.length,
      cnt: 6,
    },
    {
      name: "Wathces",
      uv: 7,
      pv: watches.length,
      amt: watches.length,
      cnt: 7,
    },
    {
      name: "Camera",
      uv: 6,
      pv: camera.length,
      amt: camera.length,
      cnt: 6,
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
