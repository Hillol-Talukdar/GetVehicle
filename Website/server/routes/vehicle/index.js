const express = require('express');
const router = express.Router();
const checkAuth = require('../../middlewares/checkAuth');
const vehicleController = require('../../controllers/vehicle/vehicle.controller');

router
    .route('/')
    .get(vehicleController.getAllVehicle)
    .post(checkAuth, vehicleController.createAVehicle);

router
    .route('/:id')
    .get(vehicleController.getAVehicle)
    .patch(checkAuth, vehicleController.updateAVehicle)
    .delete(checkAuth, vehicleController.deleteAVehicle);

module.exports = router;
