const express = require("express");

const { createNewAuthor } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewAuthor);

module.exports = usersRouter;
