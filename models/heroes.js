const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Heroes extends Model {}

Heroes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // image: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        health: {
            type: DataTypes.INTEGER,
            validate: {
                isAlphanumeric: true,
            }
        },
        attack: {
            type: DataTypes.INTEGER,
            validate: {
                isAlphanumeric: true,
            }
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isDecimal: true,
        },
        // weight: {
        //     type: DataTypes.STRING,
        //     validate: {
        //         isAlphanumeric: true,
        //     }
        // },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'heroes',
    }
)



module.exports = Heroes