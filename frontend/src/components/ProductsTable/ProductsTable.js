import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    setproducts,
    addproduct,
    updateproductById,
    deleteProductById,
  } from "../../reducer/products";

  import "./ProductsTable.css";

  import { RiDeleteBinLine } from "react-icons/ri";
const ProductsTable = () => {


    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    const [message, setMessage] = useState("");
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
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


     //////////////////////////////////////////////////////////////////////////////////////////////////////
   // delete product


   const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      dispatch(deleteProductById(id));
    } catch (error) {
      console.log(error);
    }
  };


  /////////////////////////////////////////////////////////////////////////////////////////////////////
//use effect

useEffect(() => {
    getAllProducts()
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


    return (
      <div className="main">
        <div className="side" >
        <Link to="/productsTable" className="pro1">Products</Link>
            
             <Link to="/usersTable" className="use1">Users</Link>
             <Link to="/newProduct" className="newProduct">New Product</Link>
        </div>
        <div className="name" >
         <div> <h1>Products </h1></div>
          <div><p>Dashboard</p></div>
        </div>
        <div className="box" >
          <div className="one">
            <div>
              <p>Users</p>
            </div>
            <div>
              <p>55</p>
            </div>
            </div>
          <div className="two">
          <div>
              <p>Products</p>
            </div>
            <div>
              <p>{state.products.length}</p>
            </div>
          </div>
          <div className="three">
          <div>
              <p>Carts</p>
            </div>
            <div>
              <p>55</p>
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
        <div className="charts" >
          <div></div>
          <div></div>
        </div>
        <div className="table" >
        <div className="tableDiv">
              {/* {state.isLoggedIn?
         <div className="tablesLink">
         <Link to="/productsTable" className="pro1">Products</Link>
             <Link to="/usersTable" className="use1">Users</Link>
         </div>:<div></div>
    } */}
            <div >
                <table className="insidTable">
                    <tr className="tr">
                        <th>id</th>
                        <th>name</th>
                        <th>brand</th>
                        <th>type</th>
                        <th>price</th>
                        <th>Actions</th>

                    </tr>
                    {
                        show && state.products.map((ele) => {
                            return (
                                
                                    <tr className="tr">
                                        <td >{ele.id}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.brand}</td>
                                        <td>{ele.type}</td>
                                        <td>{ele.price}</td>
                                        <td>
                    <RiDeleteBinLine id="delete"   onClick={() => deleteProduct(ele.id)}/></td>
                                    </tr>

                            )


                        })
                    }



                </table>

            </div>


                        {/* <Link to="/newProduct" className="newProduct">New Product</Link> */}



        </div>
          
        </div>
      </div>

        
    )
}
export default ProductsTable;
