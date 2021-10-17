const express = require('express');

const {body} = require('express-validator'); // Package to vlidate input

const feedController = require('../controllers/feed');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// Get list of posts
router.get('/posts', feedController.getPosts);

// Get post
router.get('/post/:id',checkAuth, feedController.getPostById);

// Update post
router.put('/post/update/:id',checkAuth, feedController.updatePost);

// Create post
router.post('/post',checkAuth, [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
] ,feedController.createPost);

module.exports = router;

