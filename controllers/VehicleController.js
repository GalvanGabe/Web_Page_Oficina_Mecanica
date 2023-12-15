const Vehicle = require('../models/Vehicle')
const Customer = require('../models/Customer')
const Service = require('../models/Service')

module.exports = class VehicleController {

    static async createVehicle(req, res) {
        
        const id = req.params.id

        try {

            const customer = await Customer.findOne({where: {id: id}})

            res.render('registervehicle', {customer: customer.get({plain: true})})

        } catch(error) {
            console.log(error)
        }

    }

    static async createVehicleSave(req, res) {

        const CustomerId = req.body.CustomerId
        const owner = req.body.owner
        const brand = req.body.brand
        const model = req.body.model
        const motor = req.body.motor
        const license_plate = req.body.license_plate
        const year = req.body.year
        const color = req.body.color

        const vehicle = {
            CustomerId,
            owner,
            brand,
            model,
            motor,
            license_plate,
            year,
            color
        }

        await Vehicle.create(vehicle)

        res.redirect(`/customer/${CustomerId}`)
    }

    static async removeVehicle(req, res) {

        const CustomerId = req.body.CustomerId
        const id = req.body.id

        try {

            await Service.destroy({
                where: {VehicleId: id}
            })

            await Vehicle.destroy({
                where: {id: id}
            })
            
            res.redirect(`/customer/${CustomerId}`)

        } catch(error) {
            console.log(error)
        }

    }

    static async updateVehicle(req, res) {

        const id = req.params.id

        try {

            const vehicle = await Vehicle.findOne({where: {id: id}})

            res.render('editvehicle', {vehicle: vehicle.get({plain: true})})

        } catch(error) {
            console.log(error)
        }
    
    }

    static async updateVehiclePost(req, res) {

        const id = req.body.id
        const CustomerId = req.body.CustomerId
        const owner = req.body.owner
        const brand = req.body.brand
        const model = req.body.model
        const motor = req.body.motor
        const license_plate = req.body.license_plate
        const year = req.body.year
        const color = req.body.color

        const vehicleData = {
            id,
            CustomerId,
            owner,
            brand,
            model,
            motor,
            license_plate,
            year,
            color
        }

        await Vehicle.update(vehicleData, {where: {id: id}})
        
        res.redirect(`/vehicle/${id}`)
    }

    static async showVehicle(req, res) {

        const id = req.params.id

        try {

            const vehicle = await Vehicle.findOne({include: Service, where: {id: id}})
        
            res.render('vehicle', {vehicle: vehicle.get({plain: true})})

        } catch(error) {
            console.log(error)
        }

    }

    static async showVehicles(req, res) {

        const vehicles = await Vehicle.findAll({raw: true})

        res.render('registeredvehicles', {vehicles: vehicles})
    }

}