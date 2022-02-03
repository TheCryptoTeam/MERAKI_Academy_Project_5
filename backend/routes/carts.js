const express = require("express");

const {
  addTOCart,
  getMyCart,
  deleteFromMyCart,
} = require("../controllers/carts");
const authentication = require("../middlewares/authentication");

const cartsRouter = express.Router();

cartsRouter.post("/:id", authentication, addTOCart);
cartsRouter.get("/",authentication, getMyCart);
cartsRouter.delete("/:id", deleteFromMyCart);

module.exports = cartsRouter;
