const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/vehicle/vehicle.controller');

router.route('/').get(vehicleController.getAllVehicle);

router.route('/:id').get(vehicleController.getVehicle);

module.exports = router;
