const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// exports.signup = async (req, res) => {
//   try {
//     // Validate if all required fields are present
//     if (
//       !req.body.name ||
//       !req.body.email ||
//       !req.body.password ||
//       !req.body.passwordConfirm
//     ) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Please fill in all required fields",
//       });
//     }

//     // Validate password confirmation
//     if (req.body.password !== req.body.passwordConfirm) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Passwords do not match",
//       });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);

//     // Create a new user with hashed password
//     const user = await User.create({
//       name: req.body.name,
//       password: hashedPassword,
//       email: req.body.email,
//       role: req.body.role,
//     });

//     if (!user) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Failed to create user",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(user._id, process.env.JWT_SECRET);

//     res.status(201).json({
//       status: "success",
//       token,
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({
//       status: "fail",
//       message: "Internal Server Error",
//     });
//   }
// };

exports.register = async (req, res, next) => {
    try {
      const { name, email, password, passwordConfirm, role } = req.body;
  
      if (!name || !email || !password || !passwordConfirm || !role) {
        return res.status(400).json({
          status: "fail",
          message: "Please provide all required fields",
        });
      }
  
      if (password !== passwordConfirm) {
        return res.status(400).json({
          status: "fail",
          message: "Passwords do not match",
        });
      }
  
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
      });
  
      if (!user) {
        return res.status(500).json({
          status: "fail",
          message: "Failed to create user",
        });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
      res.status(201).json({
        status: "success",
        token,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
