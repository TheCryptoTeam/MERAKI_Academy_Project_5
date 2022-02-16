const express = require("express");

//controllers
const { createNewComment, getAllComments,deleteComment } = require("../controllers/comments");

//middlewares
const authentication = require("../middlewares/authentication");

const commentsRouter = express.Router();

commentsRouter.post(
  "/productes/:product_id/comments",
  authentication,
  createNewComment
);
commentsRouter.get(
  "/productes/:product_id/comments",
  getAllComments
);

commentsRouter.delete(
  "/productes/:id/comments",
  deleteComment
);

module.exports = commentsRouter;
