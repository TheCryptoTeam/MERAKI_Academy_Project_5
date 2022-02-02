import React from "react";
import axios from "axios";

////////////////////////////////////////////////////////////////////////////////////////////////////
//component Home

const Home = () => {
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

  return <div></div>;
};

export default Home;
