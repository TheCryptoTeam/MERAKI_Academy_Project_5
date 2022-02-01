const express = require("express");

const { addTOCart } = require("../controllers/carts");
const authentication =require("../middlewares/authentication")

const  cartsRouter = express.Router();

cartsRouter.post("/:id",authentication, addTOCart);

module.exports =  cartsRouter;
