import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setproducts, addproduct, updateproductById, deleteProductById } from "../reducer/products";


////////////////////////////////////////////////////////////////////////////////////////////////////
//component Home

const Home = () => {


    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return { token: state.loginReducer.token, products: state.productsReducer.products, isLoggedIn: state.loginReducer.isLoggedIn };

    })


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //  getAllProducts

    const getAllProducts = async () => {
        const res = await axios
            .get("http://localhost:5000/products")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return <div>
        <button onClick={() => 
            getAllProducts
        }>test</button>
    </div>;
};

export default Home;
