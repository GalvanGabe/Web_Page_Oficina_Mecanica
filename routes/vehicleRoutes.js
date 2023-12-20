const express = require('express')
const router = express.Router()

const VehicleController = require('../controllers/VehicleController')

router.get('/customer/:id/registervehicle', VehicleController.createVehicle)
router.post('/registervehicle/create', VehicleController.createVehicleSave)
router.get('/vehicle/:id', VehicleController.showVehicle)
router.post('/registervehicle/delete', VehicleController.removeVehicle)
router.get('/vehicle/:id/edit', VehicleController.updateVehicle)
router.post('/registervehicle/update', VehicleController.updateVehiclePost)
router.get('/registeredvehicles', VehicleController.showVehicles)

module.exports = router