import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

//===============================================================

const App = () => {
  const token = localStorage.getItem("userToken");
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/home" element={<Register />} />

      </Routes>
    </div>
  );
};

export default App;
