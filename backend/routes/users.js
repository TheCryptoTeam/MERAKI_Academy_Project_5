const express = require("express");

const { createNewAuthor, getAllUsers } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewAuthor);

usersRouter.get("/", getAllUsers);


module.exports = usersRouter;
