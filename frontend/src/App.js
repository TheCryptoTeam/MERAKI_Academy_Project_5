import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

//===============================================================

const App = () => {
  const token = localStorage.getItem("userToken");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login loggedin={setisLoggedIn} />}
          setisLoggedIn={setisLoggedIn}
        />
      </Routes>
    </div>
  );
};

export default App;
