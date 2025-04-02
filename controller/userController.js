const User = require("../models/user");

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
