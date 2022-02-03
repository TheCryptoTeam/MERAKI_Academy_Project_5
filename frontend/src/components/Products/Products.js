import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setproducts, addproduct, updateproductById, deleteProductById } from "../../reducer/products";





const Products = () => {

    const [massage, setMessage] = useState("")
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return { token: state.loginReducer.token, products: state.productsReducer.products, isLoggedIn: state.loginReducer.isLoggedIn };

    })





    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //get all product


    const getAllProduts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/products", {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
            });
            if (res.data.success) {
                dispatch(setproducts(res.data.products))
                setMessage("");
                // setShow(true);
                // setUserId(res.data.userId);
            } else throw Error;
        } catch (error) {
            if (!error.response.data.success) {
                return setMessage(error.response.data.message);
            }
            setMessage("Error happened while Get Data, please try again");
        }
    };








}

export default Products;