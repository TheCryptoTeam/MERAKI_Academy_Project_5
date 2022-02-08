const express = require("express");

const { createNewAuthor, getAllUsers,deleteUserById } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewAuthor);

usersRouter.get("/", getAllUsers);
usersRouter.delete("/:id", deleteUserById);



module.exports = usersRouter;
