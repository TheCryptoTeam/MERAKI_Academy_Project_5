const express = require("express");

const { createNewAuthor, getAllUsers,deleteUserById,getUsersNoLimit } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewAuthor);

usersRouter.get("/", getAllUsers);
usersRouter.get("/AllUsers", getUsersNoLimit);
usersRouter.delete("/:id", deleteUserById);



module.exports = usersRouter;
