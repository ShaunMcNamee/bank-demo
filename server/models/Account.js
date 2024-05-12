const { DataTypes } = require('sequelize')
const database = require('../database')

const Account = database.define('account', {
  account_number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  amount: DataTypes.INTEGER,
  type: DataTypes.STRING,
  credit_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, { createdAt: false, updatedAt: false, deletedAt: false })

Account.sync()

module.exports = Account