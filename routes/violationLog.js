const express = require('express');

const {body} = require('express-validator'); // Package to vlidate input

const violationLogController = require('../controllers/violationLog');

const checkAuth = require("../middleware/check-auth");

const getUserData = require("../middleware/get-user");

const router = express.Router();

// Get list of Violations Log
router.get('/list',getUserData, violationLogController.getViolationsLog);

// Create Violation Log
router.post('/create',checkAuth ,violationLogController.createViolationLog);

// Get violation log by id
router.get('/log/:id',checkAuth, violationLogController.getViolationLogById);

// Update log
router.put('/log/update/:id',checkAuth, violationLogController.updateViolationLog);

// Pay violation log
router.put('/log/pay', checkAuth, violationLogController.payViolation)


module.exports = router;

