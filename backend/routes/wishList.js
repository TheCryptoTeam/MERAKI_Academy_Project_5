const express = require("express");

const { addToWishList } = require("../controllers/WishList");
const authentication = require("../middlewares/authentication");
const wishListRouter = express.Router();

wishListRouter.post("/:id", authentication, addToWishList);

module.exports = wishListRouter;
