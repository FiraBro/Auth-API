const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
// const path = require("path"); // Add path module
// const multer = require("multer");

app.use(cors());
// Load environment variables
dotenv.config({ path: "config.env" });

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from uploads directory

const userRouter = require("./routes/userRouter");
const courseRouter = require("./routes/courseRouter");
app.use("/api/v2/users", userRouter);
app.use("/api/v2/course", courseRouter);

module.exports = app;
