const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Customer = require('./Customer')

const Vehicle = db.define('Vehicle', {

    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Customer.hasMany(Vehicle, {foreignKey: 'CustomerId', onDelete: 'CASCADE'});
Vehicle.belongsTo(Customer, {foreignKey: 'CustomerId', onDelete: 'CASCADE'});

module.exports = Vehicle