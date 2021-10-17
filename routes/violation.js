const express = require('express');

const {body} = require('express-validator'); // Package to vlidate input

const violationController = require('../controllers/violation');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// Get list of posts
router.get('/list',checkAuth, violationController.getViolations);

// Get post
//router.get('/post/:id',checkAuth, violationController.getPostById);

// Update post
//router.put('/post/update/:id',checkAuth, violationController.updatePost);

// Create violation
router.post('/create',checkAuth ,violationController.createViolation);

module.exports = router;

