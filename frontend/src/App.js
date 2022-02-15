import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NewProduct from "./components/NewProduct/NewProduct";
import Navigation from "./components/Navigation/Navigation";
import Brand from "./components/Brand/Brand";
import Type from "./components/Type/Type";
import Carts from "./components/Carts/carts";
import Search from "./components/Search/Search";
import Products from "./components/Products/Products";
import WishLists from "./components/WishLists/WishLists";
import Footer from "./components/Footer/Footer";
import ProductsTable from "./components/ProductsTable/ProductsTable";
import UsersTable from "./components/UsersTable/UsersTable";
import StripePayment from "./components/Stripe/StripContainer";

import { Chat } from "./chatbot";
//===============================================================

const App = () => {
  const role = localStorage.getItem("myRole");
  const [productName, setProductName] = useState("");
  return (
    <div className="App">
      <Navigation setProductName={setProductName} />
      <Chat />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/newProduct"
          element={
            role == 2 ? (
              <NewProduct />
            ) : (
              <>
                <img
                  style={{ height: "40rem", width: "90rem" }}
                  src="https://www.howtoquestion.com/wp-content/uploads/2020/05/fix-401-Error.jpg"
                  alt="401 Unauthorized"
                />
              </>
            )
          }
        />
        <Route path="/brand" element={<Brand />} />
        {<Route path="type/:type" element={<Type />} />}
        <Route path="/carts" element={<Carts />} />
        <Route path="/search" element={<Search productName={productName} />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/wishLists" element={<WishLists />} />
        <Route path="brand/:brand" element={<Brand />} />
        <Route
          path="/productsTable"
          element={
            role == 2 ? (
              <ProductsTable />
            ) : (
              <>
                <img
                  style={{ height: "40rem", width: "90rem" }}
                  src="https://www.howtoquestion.com/wp-content/uploads/2020/05/fix-401-Error.jpg"
                  alt="401 Unauthorized"
                />
              </>
            )
          }
        />
        <Route
          path="/usersTable"
          element={
            role == 2 ? (
              <UsersTable />
            ) : (
              <>
                <img
                  style={{ height: "40rem", width: "90rem" }}
                  src="https://www.howtoquestion.com/wp-content/uploads/2020/05/fix-401-Error.jpg"
                  alt="401 Unauthorized"
                />
              </>
            )
          }
        />
        <Route path="/payment" element={<StripePayment />} />
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
      <Footer />
    </div>
  );
};

export default App;
