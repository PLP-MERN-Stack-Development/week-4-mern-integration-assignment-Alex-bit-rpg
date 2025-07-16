const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');

// @desc    Get all blog posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('category', 'name').sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// @desc    Get a specific blog post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('category', 'name');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  res.status(200).json(post);
});

// @desc    Create a new blog post
// @route   POST /api/posts
// @access  Private (will add auth later)
const createPost = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('content').notEmpty().withMessage('Content is required').trim(),
  // body('category').notEmpty().withMessage('Category is required'), // Uncomment when category is mandatory

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category, featuredImage } = req.body;

    const post = await Post.create({
      title,
      content,
      category,
      featuredImage,
      // user: req.user.id, // Uncomment when user authentication is implemented
    });

    res.status(201).json(post);
  }),
];

// @desc    Update an existing blog post
// @route   PUT /api/posts/:id
// @access  Private (will add auth later)
const updatePost = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty').trim(),
  body('content').optional().notEmpty().withMessage('Content cannot be empty').trim(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Check if logged-in user owns the post (when auth is implemented)
    // if (post.user.toString() !== req.user.id) {
    //   res.status(401);
    //   throw new Error('User not authorized');
    // }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(post);
  }),
];

// @desc    Delete a blog post
// @route   DELETE /api/posts/:id
// @access  Private (will add auth later)
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check if logged-in user owns the post (when auth is implemented)
  // if (post.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  await post.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Post removed' });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};