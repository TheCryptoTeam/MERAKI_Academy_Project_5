import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

//===============================================================

const App = () => {
  const token = localStorage.getItem("userToken");
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/home" element={<Home />} /> 
        {/* <Route path="/prdouct" element={<Prdouct />} /> */}
        <Route
          path="*"
          element={
            <>
              <img
                style={{ height: "40rem", width: "90rem" }}
                src="http://www.repairmycreditnow.com/wp-content/uploads/2014/11/404-not-found.jpg"
                alt="404 Page not found"
              />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
