const express = require("express");
 const{createNewProduct, getAllProducts, getProductByName, getProductByType, getProductByBrand}=require("../controllers/products")
 

const productsRouter=express.Router();

productsRouter.post("/",createNewProduct)
productsRouter.get("/",getAllProducts)

productsRouter.get("/search_1",getProductByName)
productsRouter.get("/search_2",getProductByType)
productsRouter.get("/search_3",getProductByBrand)


module.exports=productsRouter