const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
// const path = require("path"); // Add path module
app.use(cors());
// Load environment variables
dotenv.config({ path: "config.env" });

// Middleware
app.use(express.json());
app.use(morgan("dev"));
const userRouter = require("./routes/userRouter");
app.use("/api/v2/users", userRouter);
module.exports = app;
