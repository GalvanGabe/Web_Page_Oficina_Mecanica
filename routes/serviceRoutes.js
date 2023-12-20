const express = require('express')
const router = express.Router()

const ServiceController = require('../controllers/ServiceController')

router.get('/vehicle/:id/addservice', ServiceController.createService)
router.post('/addservice/create', ServiceController.createServicePost)
router.post('/addservice/delete', ServiceController.removeService)
router.get('/servicesperformed', ServiceController.showServices)

module.exports = router