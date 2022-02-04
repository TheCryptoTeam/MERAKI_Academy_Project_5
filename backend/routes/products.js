const express = require("express");
 const{createNewProduct, getAllProducts, getProductByName,
     getProductByType, getProductByBrand, updateProductById,
      deleteProductById, getProductById}=require("../controllers/products")
 

const productsRouter=express.Router();

productsRouter.post("/",createNewProduct)
productsRouter.get("/",getAllProducts)

productsRouter.get("/id/:id",getProductById)
productsRouter.get("/search_name",getProductByName)
productsRouter.get("/search_type",getProductByType)
productsRouter.get("/search_brand",getProductByBrand)

productsRouter.put("/:id", updateProductById);
productsRouter.delete("/:id",deleteProductById)


module.exports=productsRouter