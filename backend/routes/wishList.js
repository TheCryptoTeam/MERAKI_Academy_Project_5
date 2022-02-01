const express = require("express");

const { addToWishList, GetMyWishList } = require("../controllers/WishList");
const authentication = require("../middlewares/authentication");
const wishListRouter = express.Router();

wishListRouter.post("/:id", authentication, addToWishList);
wishListRouter.get("/", GetMyWishList);

module.exports = wishListRouter;
