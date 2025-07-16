const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.status(200).json(categories);
});

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private (will add auth later)
const createCategory = [
  body('name').notEmpty().withMessage('Category name is required').trim().custom(async (value) => {
    const categoryExists = await Category.findOne({ name: value });
    if (categoryExists) {
      throw new Error('Category already exists');
    }
    return true;
  }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const category = await Category.create({ name });

    res.status(201).json(category);
  }),
];

module.exports = {
  getCategories,
  createCategory,
};