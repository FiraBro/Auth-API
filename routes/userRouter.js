const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");

// Fix: Reference the specific `signup` function from `authController`
userRouter.post("/signup", authController.register);
userRouter.post('/login',authController.login)
// Other routes
userRouter.route("/").get(userController.getAllUser);
userRouter.route("/:id").delete(userController.deleteUser);

module.exports = userRouter;
