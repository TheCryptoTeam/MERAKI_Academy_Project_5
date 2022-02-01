const express = require("express");
 const{createNewProduct, getAllProducts}=require("../controllers/products")
 

const productsRouter=express.Router();

productsRouter.post("/",createNewProduct)
productsRouter.get("/",getAllProducts)

module.exports=productsRouter