import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
 import "./Home.css"
import { setproducts, addproduct, updateproductById, deleteProductById } from "../../reducer/products";
import { Navigate, useNavigate } from "react-router-dom";

////////////////////////////////////////////////////////////////////////////////////////////////////
//component Home
const Home = () => {

    const navigate=useNavigate()
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return { token: state.loginReducer.token, products: state.productsReducer.products, isLoggedIn: state.loginReducer.isLoggedIn };

    })


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //  getAllProducts

    const getAllProducts = async () => {
        await axios
            .get("http://localhost:5000/products")
            .then((res) => {
                dispatch(setproducts(res.data.result))

                setShow(true)
            })
            .catch((err) => {
               throw err
            });
    };



///////////////////////////////////////////////////////////////////////////////////////////////
//   






    return (<div>
        <div>
            {
                show && state.products.map((product, index) => {
                    return <div key={index} className="products" onClick={() => navigate(`/products/${product.id}`)}>
                        <div className="product">
                            <p>name:{product.name}</p>
                            <p>price:{product.price}</p>
                            <button className="add">add to cart</button>
                            <button className="add">add to wishList</button>
                        </div><br/>
                    </div>

                })
            }
        </div>

        <button onClick={
            getAllProducts
        }>test</button>
    </div>)
};

export default Home;
