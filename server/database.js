const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('postgres://user:password@localhost:5432/challenge')

module.exports = sequelize