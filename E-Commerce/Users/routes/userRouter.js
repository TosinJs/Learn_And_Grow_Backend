const express = require("express");
const { getUsers, getUser, editUser, deleteUser } = require("../Controllers/UserController");
const { verifyToken, verifyAdmin, verifyOwner } = require("../Middleware/auth");

const Router = express.Router();

Router.route("/")
    .get(verifyToken, verifyAdmin, getUsers)
    .put(verifyToken, verifyAdmin)

Router.route("/:id")
    .get(verifyToken, verifyAdmin, getUser)
    .put(verifyToken, verifyOwner, editUser)
    .delete(verifyToken, verifyOwner, deleteUser)

module.exports = Router;