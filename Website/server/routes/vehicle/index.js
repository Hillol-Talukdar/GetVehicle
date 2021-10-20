const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/vehicle/vehicle.controller');

router
    .route('/')
    .get(vehicleController.getAllVehicle)
    .post(vehicleController.createAVehicle);

router
    .route('/:id')
    .get(vehicleController.getAVehicle)
    .patch(vehicleController.updateAVehicle)
    .delete(vehicleController.deleteAVehicle);

module.exports = router;
