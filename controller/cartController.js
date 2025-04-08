const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

// Add Product to Cart
exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Get user ID from the authenticated request

  if (!productId || !quantity) {
    return next(new AppError("Please provide productId and quantity", 400));
  }

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Initialize cartData if it doesn't exist
  if (!user.cartData) {
    user.cartData = {};
  }

  // Add or update the product in the cart
  if (user.cartData[productId]) {
    user.cartData[productId] += quantity; // Increase quantity if product already exists
  } else {
    user.cartData[productId] = quantity; // Add new product to cart
  }

  // Save the updated cart without validating
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Product added to cart",
    cart: user.cartData,
  });
});

// Remove Product from Cart
exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id; // Get user ID from the authenticated request

  if (!productId) {
    return next(new AppError("Please provide productId", 400));
  }

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check if the product exists in the cart
  if (!user.cartData || !user.cartData[productId]) {
    return next(new AppError("Product not found in cart", 404));
  }

  // Remove the product from the cart
  delete user.cartData[productId];

  // Save the updated cart without validating
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Product removed from cart",
    cart: user.cartData,
  });
});

// Update Cart (Change Product Quantity)
exports.updateCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Get user ID from the authenticated request

  if (!productId || !quantity) {
    return next(new AppError("Please provide productId and quantity", 400));
  }

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check if the product exists in the cart
  if (!user.cartData || !user.cartData[productId]) {
    return next(new AppError("Product not found in cart", 404));
  }

  // Update the product quantity
  user.cartData[productId] = quantity;

  // Save the updated cart without validating
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Cart updated",
    cart: user.cartData,
  });
});
