import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  setusers,
  deleteUserById

} from "../../reducer/users/users";

import "./usersTable.css";
import { logout } from "../../reducer/login/index";

const UsersTable = () => {


  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const history = useNavigate();


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







  ///////////////////////////////////////////////////////////////////////////////////////////////
  //get all users



  const getAllUsers = async () => {
    await axios
      .get(`http://localhost:5000/users?skip=${skip}&limit=4`)
      .then((res) => {
        dispatch(setusers(res.data.result));

        setShow(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //delete user


  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      dispatch(deleteUserById(id));
      getAllUsers()

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllUsers()
  }, [skip]);

  const inc = () => {
    setSkip(skip + 4);
    setPage(page + 1);
  };
  const dec = () => {
    if (page > 1) {
      setSkip(skip - 4);
      setPage(page - 1);
    }
  };


  //////////////////////////////////////////////////////////////////////////////// return 

  return (

    <div className="mainUsers">
      <div className="side">

        <div>
          <h3>Product</h3>
          <Link to="/productsTable" className="pro">
            Products
          </Link>
        </div>

        <div>
          <h3>Users</h3>
          <Link to="/usersTable" className="use">
            Users
          </Link>
        </div>
        <div>
          <h3> New Product</h3>
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
          <h1>Users </h1>
        </div>
        <div>
          <p>Users Table</p>
        </div>
      </div>
      <div className="table">
        <div className="tableDiv">

          <div>
            <table className="insidTable">
              <tr className="tr">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role Id</th>
                <th>Actions</th>
              </tr>
              {show &&
                state.users.map((user) => {
                  return (
                    <tr className="tr">
                      <td>{user.id}</td>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.role_id}</td>

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
                                deleteUser(user.id)
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

          <div className="paginationO">
          {page !== 1 && (
          <>
            <h1
              className="h1Pagination"
              onClick={() => {
                dec();
              }}
            >
              <BsFillArrowLeftCircleFill />
            </h1>
          </>
        )}

            <span className="pageNumber">{page}</span>
            {skip < state.products.length ? <h1 className="h1Pagination"
              onClick={() => {
                inc();
              }}
            >
              <BsFillArrowRightCircleFill />
            </h1> : <></>}



          </div>

        </div>
      </div>

    </div>

  )










}




export default UsersTable