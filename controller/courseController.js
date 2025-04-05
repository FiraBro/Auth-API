const Course = require("../models/course");
const User = require("../models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new course
exports.addCourse = catchAsync(async (req, res, next) => {
  const courseData = req.body;
  courseData.instructor = req.user.id; // Assuming instructor is the current user
  const course = new Course(courseData);

  await course.save();
  res.status(201).json({
    status: "success",
    data: course,
  });
});

// Get all courses
exports.getAllCourse = catchAsync(async (req, res, next) => {
  const courses = await Course.find().populate("instructor", "name email");
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: courses,
  });
});

// Get a course by ID
exports.getCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId).populate(
    "instructor",
    "name email"
  );

  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: course,
  });
});

// Update a course
exports.updateCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCourse) {
    return next(new AppError("No course found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedCourse,
  });
});

// Delete a course
exports.deleteCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  await Course.findByIdAndDelete(courseId);

  if (!courseId) {
    return next(new AppError("No course found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Enroll a student in a course
exports.enrollStudent = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  if (course.students.includes(userId)) {
    return next(new AppError("You are already enrolled in this course", 400));
  }

  course.students.push(userId);
  await course.save();

  res.status(200).json({
    status: "success",
    message: "You have been enrolled in the course",
  });
});

// Get student count for a course
exports.getCourseStudentCount = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    count: course.students.length,
  });
});
