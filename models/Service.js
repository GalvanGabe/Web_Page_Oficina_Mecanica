const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Vehicle = require('./Vehicle')

const Service = db.define('Service', {

    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    km: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false,
})

Vehicle.hasMany(Service, { onDelete: 'CASCADE' });
Service.belongsTo(Vehicle, { onDelete: 'CASCADE' });

module.exports = Service