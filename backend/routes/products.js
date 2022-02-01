const express = require("express");
 const{createNewProduct, getAllProducts, getProductByName}=require("../controllers/products")
 

const productsRouter=express.Router();

productsRouter.post("/",createNewProduct)
productsRouter.get("/",getAllProducts)

productsRouter.get("/search_1",getProductByName)
module.exports=productsRouter