const express = require('express')
const router = express.Router()

const CustomerController = require('../controllers/CustomerController')

router.get('/registercustomer', CustomerController.createCustomer)
router.post('/registercustomer/create', CustomerController.createCustomerSave)
router.get('/customer/:id', CustomerController.showCustomer)
router.post('/registercustomer/delete', CustomerController.removeCustomer)
router.get('/customer/:id/edit', CustomerController.updateCustomer)
router.post('/registercustomer/update', CustomerController.updateCustomerPost)
router.get('/registeredcustomers', CustomerController.showCustomers)

module.exports = router