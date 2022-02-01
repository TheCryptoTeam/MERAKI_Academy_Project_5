const express = require("express");

//controllers
const { createNewRole } = require("../controllers/roles");

const rolesRouter = express.Router();

rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
