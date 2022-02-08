import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

  import {
    setusers,
    deleteUserById
   
  } from "../../reducer/users/users";


const UsersTable = () => {


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







  ///////////////////////////////////////////////////////////////////////////////////////////////
  //get all users


  
  const getAllUsers = async () => {
    await axios
        .get(`http://localhost:5000/users?skip=${skip}&limit=3`)
        .then((res) => {
            console.log(res);
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
        setSkip(skip + 3);
        setPage(page + 1);
      };
      const dec = () => {
        if (page > 1) {
          setSkip(skip - 3);
          setPage(page - 1);
        }
      };


  //////////////////////////////////////////////////////////////////////////////// return 

return(

    <div>
    <table className="table">
        <tr className="tr">
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        {
            show && state.users.map((user) => {
                return (
                    
                        <tr className="tr">
                            <td >{user.id}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td><button  className="del"
        onClick={() => deleteUser(user.id)}>delete</button></td>
                        </tr>

                )


            })
        }



    </table>
</div>

)










}




    export default UsersTable