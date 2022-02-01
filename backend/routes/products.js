const express = require("express");
 const{createNewProduct}=require("../controllers/products")
 

const productsRouter=express.Router();

productsRouter.post("/products",createNewProduct)

module.exports=productsRouter