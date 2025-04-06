// utils/helpers.js

/**
 * Filters out unwanted fields from an object
 * @param {Object} obj - The object to filter
 * @param {...String} allowedFields - Fields to keep
 * @returns {Object} - New object with only allowed fields
 */
exports.filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

// Alternative ES6 version:
exports.filterObj = (obj, ...allowedFields) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (allowedFields.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
