const Service = require('../models/Service')
const Vehicle = require('../models/Vehicle')

module.exports = class ServiceController {

    static async createService(req, res) {

        const id = req.params.id

        try {

            const vehicle = await Vehicle.findOne({where: {id: id}})

            res.render('addservice', {vehicle: vehicle.get({plain: true})})

        } catch(error) {
            console.log(error)
        }

    }

    static async createServicePost(req, res) {

        const VehicleId = req.body.VehicleId
        const type = req.body.type
        const km = req.body.km
        const date = req.body.date

        const service = {
            VehicleId,
            type,
            km,
            date,
        }

        await Service.create(service)

        res.redirect(`/vehicle/${VehicleId}`)
    }

    static async removeService(req, res) {

        const VehicleId = req.body.VehicleId
        const id = req.body.id
        
        await Service.destroy({
            where: {id: id}
        })

        res.redirect(`/vehicle/${VehicleId}`)
    }

    static async showServices(req, res) {

        const services = await Service.findAll({raw: true})

        res.render('servicesperformed', {services: services})
    }

}