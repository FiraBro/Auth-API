const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a course title"],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the instructor ID"],
  },
  description: {
    type: String,
    required: [true, "Please provide a course descriptio cn"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a course price"],
  },
  category: {
    type: String,
    required: [true, "Please provide a course category"],
  },
  content: [
    {
      moduleTitle: String,
      videoUrl: String,
      duration: Number, // Duration in minutes
    },
  ],
  image: {
    type: String, // Course thumbnail image URL
    required: [true, "Please provide a thumbnail"],
  },
  rating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must not exceed 5"],
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
