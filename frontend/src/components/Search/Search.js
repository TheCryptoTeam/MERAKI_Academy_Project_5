import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";




const Search=()=>{

const [search,setSearch]=useState("")


    const getProductByName = async (name) => {
        await axios
            .get(`http://localhost:5000/products/search_name?name=${name}`)
            .then((res) => {
                dispatch(setproducts(res.data.result))

                // setShow(true)
            })
            .catch((err) => {
               throw err
            });
    };




    return (
        <div>
            <div>
                <input className="search" placeholder="search..."/>
                <button onClick={(e)=>{getProductByName(e.target.value);console.log(e.target.value);}}>search</button>
            </div>
        </div>
    )
}


export default Search;