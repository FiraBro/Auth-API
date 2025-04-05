const express = require("express");
const courseRoutes = express.Router();
const courseController = require("../controller/courseController");
const authController = require("../controller/authController");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/courses/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "course-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

// Routes
courseRoutes
  .route("/")
  .get(courseController.getAllCourse)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    upload.single("image"),
    courseController.addCourse
  );

courseRoutes
  .route("/:id")
  .get(courseController.getCourse)
  .post(courseController.updateCourse)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    courseController.deleteCourse
  );

// New route for student count
courseRoutes
  .route("/:id/students")
  .get(authController.protect, courseController.getCourseStudentCount);

// Enroll student in a course
courseRoutes
  .route("/:id/enroll")
  .post(authController.protect, courseController.enrollStudent);

module.exports = courseRoutes;
