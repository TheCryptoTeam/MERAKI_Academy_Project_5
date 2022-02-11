import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsFillArrowRightCircleFill,BsFillArrowLeftCircleFill } from "react-icons/bs";
import {
  setproducts,
  addproduct,
  updateproductById,
  deleteProductById,
} from "../../reducer/products";
import { logout } from "../../reducer/login/index";

import "./ProductsTable.css";

import { RiDeleteBinLine } from "react-icons/ri";
import  { PureComponent } from 'react';
import Swal from "sweetalert2";
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
} from 'recharts';




const ProductsTable = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const history = useNavigate();
  const [allProducts, setAllProducts] = useState("");
  const [users, setUsers] = useState("");
  const [carts, setCarts] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  
  const [show, setShow] = useState(false);

  
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      products: state.productsReducer.products,
      users: state.usersReducer.users,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  //////////////////////////////////////////////////////////////////////////////////////

  const getAllProducts = async () => {
    await axios
      .get(`http://localhost:5000/products/page?skip=${skip}&limit=4`)
      .then((res) => {
        dispatch(setproducts(res.data.result));

        setShow(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  //==========================================================================
  const getProductsNoLimit = async () => {
    await axios
      .get(`http://localhost:5000/products`)
      .then((res) => {
        setAllProducts(res.data.result);
      })
      .catch((err) => {
        throw err;
      });
  };

  //==========================================================================
  const getAllUsers = async () => {
    await axios
      .get(`http://localhost:5000/users/AllUsers`)
      .then((res) => {
        setUsers(res.data.result);
      })
      .catch((err) => {
        throw err;
      });
  };

  //==========================================================================
  const getAllCarts = async () => {
    await axios
      .get(`http://localhost:5000/carts/All`)
      .then((res) => {
        setCarts(res.data.results);
      })
      .catch((err) => {
        throw err;
      });
  };

  //================================================================================

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // delete product

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      dispatch(deleteProductById(id));
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //use effect

  useEffect(() => {
    getAllProducts();
    getProductsNoLimit();
    getAllUsers();
    getAllCarts();
  }, [skip]);

  const inc = () => {
    setSkip(skip + 3);
    setPage(page + 1);
  };
  const dec = () => {
    if (page > 1) {
      setSkip(skip - 3);
      setPage(page - 1);
    }
  };

  ////////////////////////////////////////////////////////////////return
//==============================
const data = [
  {
    name: 'Laptop',
    uv: 800,
    pv: 1400,
    amt: 1400,
    cnt: 800,
  },
  {
    name: 'Mobile',
    uv: 700,
    pv: 1250,
    amt: 1250,
    cnt: 700,
  },
  {
    name: 'TV',
    uv: 600,
    pv: 700,
    amt: 700,
    cnt: 600,
  },
  {
    name: 'Wathces',
    uv: 900,
    pv: 1200,
    amt: 1200,
    cnt: 900,
  },
  {
    name: 'Camera',
    uv: 650,
    pv: 900,
    amt: 900,
    cnt: 650,
  },
 
];

//=============================================
const data2 = [
  {
    name: 'Sep',
   
    pv: 1100,
    amt: 1100,
  
  },
  {
    name: 'Oct',
   
    pv: 950,
    amt: 950,
    
  },
  {
    name: 'Nov',
    
    pv: 1200,
    amt: 1200,
    
  },
  {
    name: 'Dec',
   
    pv: 1600,
    amt: 1600,
    
  },
  {
    name: 'Jan',
   
    pv: 1200,
    amt: 1200,
    
  },
  {
    name: 'Feb',
   
    pv: 700,
    amt: 700,
    
  },
 
];

//=================================
  return (
    <div className="main">
      <div className="side">
      <div>
        <h3  >Product</h3>
        <Link to="/productsTable" className="pro1">
          Products
        </Link>

      </div>
       <div>
       <h3>Users</h3>
        <Link to="/usersTable" className="use1">
          Users
        </Link>
        </div>
        <div>
          <h3>New Product</h3>
        <Link to="/newProduct" >
          New Product
        </Link>
        </div>
        <div >
        <h3>Logout</h3>
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
          <h1>Products </h1>
        </div>
        <div>
          <p>Dashboard</p>
        </div>
      </div>
      <div className="box">
        <div className="one">
          <div>
            <p>Users</p>
          </div>
          <div>
            <p>{users.length}</p>
          </div>
        </div>
        <div className="two">
          <div>
            <p>Products</p>
          </div>
          <div>
            <p>{allProducts.length}</p>
          </div>
        </div>
        <div className="three">
          <div>
            <p>Carts</p>
          </div>
          <div>
            <p>{carts.length}</p>
          </div>
        </div>
        <div className="four">
          <div>
            <p>Suppliers</p>
          </div>
          <div>
            <p>55</p>
          </div>
        </div>
      </div>
      <div className="charts">
        <div>
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
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          <Scatter dataKey="cnt" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
        </div>
        <div>
        <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data2}
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
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          <Scatter dataKey="cnt" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
        
        </div>
      </div>
      <div className="table">
        <div className="tableDiv">
          {/* {state.isLoggedIn?
         <div className="tablesLink">
         <Link to="/productsTable" className="pro1">Products</Link>
             <Link to="/usersTable" className="use1">Users</Link>
         </div>:<div></div>
    } */}
          <div>
            <table className="insidTable">
              <tr className="tr">
                <th>id</th>
                <th>name</th>
                <th>brand</th>
                <th>type</th>
                <th>price</th>
                <th>Actions</th>
              </tr>
              {show &&
                state.products.map((ele) => {
                  return (
                    <tr className="tr">
                      <td>{ele.id}</td>
                      <td>{ele.name}</td>
                      <td>{ele.brand}</td>
                      <td>{ele.type}</td>
                      <td>{ele.price}</td>
                      <td>
                        <RiDeleteBinLine
                          id="delete"
                          onClick={() => 
                            Swal.fire({
                              title: 'Are you sure?',
                              text: "You won't be able to revert this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire(
                                  'Deleted!',
                                  'Your file has been deleted.',
                                  'success'
                                )
                                deleteProduct(ele.id)
                              }
                            })
                            }
                        />
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>

          {/* <Link to="/newProduct" className="newProduct">New Product</Link> */}
          <div className="pagination">
            <h1 className="h1Pagination"
              onClick={() => {
                dec();
              }}
            >
              <BsFillArrowLeftCircleFill/>
            </h1>
            <span className="pageNumber">{page}</span>
            <h1 className="h1Pagination"
              onClick={() => {
                inc();
              }}
            >
              <BsFillArrowRightCircleFill/>
            </h1>
         

  </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsTable;
