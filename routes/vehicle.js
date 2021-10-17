const express = require('express');

const vehicleController = require('../controllers/vehicle');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// Get list of vehicles
router.get('/list',checkAuth, vehicleController.getVehiclesList);

module.exports = router;

