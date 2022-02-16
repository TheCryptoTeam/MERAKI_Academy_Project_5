const express = require("express");

const { addToWishList, GetMyWishList ,deleteFromMyWishList} = require("../controllers/WishList");
const authentication = require("../middlewares/authentication");
const wishListRouter = express.Router();

wishListRouter.post("/:id", authentication, addToWishList);
wishListRouter.get("/", authentication, GetMyWishList);
wishListRouter.delete("/:id", deleteFromMyWishList);

module.exports = wishListRouter;
