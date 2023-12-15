const Customer = require('../models/Customer')
const Vehicle = require('../models/Vehicle')
const Service = require('../models/Service')

module.exports = class CustomerController {

    static createCustomer(req, res) {
        res.render('registercustomer')
    }

    static async createCustomerSave(req, res) {

        const name = req.body.name
        const cpf = req.body.cpf
        const email = req.body.email
        const age = req.body.age
        const phone = req.body.phone
        const city = req.body.city
        const state = req.body.state

        await Customer.create({name, cpf, email, age, phone, city, state})

        res.redirect('/registeredcustomers')
    }

    static async removeCustomer(req, res) {

        const id = req.body.id

        try {

            const vehicles = await Vehicle.findAll({
                where: {CustomerId: id}
            })
    
            vehicles.forEach(async (vehicle) => {
                await Service.destroy({
                    where: {VehicleId: vehicle.id}
                })
            })

            await Vehicle.destroy({
                where: {CustomerId: id}
            })

            await Customer.destroy({
                where: {id: id}
            })
            
            res.redirect('/registeredcustomers') 

        } catch(error) {
            console.log(error)
        }

    }

    static async updateCustomer(req, res) {

        const id = req.params.id

        try {

            const customer = await Customer.findOne({where: {id: id}})

            res.render('editcustomer', {customer: customer.get({plain: true})})

        } catch(error) {
            console.log(error)
        }

    }

    static async updateCustomerPost(req, res) {

        const id = req.body.id
        const name = req.body.name
        const cpf = req.body.cpf
        const email = req.body.email
        const age = req.body.age
        const phone = req.body.phone
        const city = req.body.city
        const state = req.body.state

        const customerData = {
            id,
            name,
            cpf,
            email,
            age,
            phone,
            city,
            state,
        }

        await Customer.update(customerData, {where: {id: id}})
    
        res.redirect(`/customer/${id}`)
    }

    static async showCustomer(req, res) {

        const id = req.params.id

        try {

            const customer = await Customer.findOne({include: Vehicle, where: {id: id}})
        
            res.render('customer', {customer: customer.get({plain: true})})

        } catch(error) {
            console.log(error)
        }

    }

    static async showCustomers(req, res) {
        
        const customers = await Customer.findAll({raw: true})

        res.render('registeredcustomers', {customers: customers})
    }

}