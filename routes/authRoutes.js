const { signUp, login } = require("../controllers/authController");

const authRoutes = require("express").Router();

authRoutes.post("/signup", signUp);

authRoutes.post("/login", login);

module.exports = authRoutes;