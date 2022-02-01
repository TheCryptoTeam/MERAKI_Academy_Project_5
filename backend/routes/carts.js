const express = require("express");

const { addTOCart , getMyCart} = require("../controllers/carts");
const authentication =require("../middlewares/authentication")

const  cartsRouter = express.Router();

cartsRouter.post("/:id",authentication, addTOCart);
cartsRouter.get("/",getMyCart)


module.exports =  cartsRouter;
