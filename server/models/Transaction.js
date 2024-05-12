const { DataTypes } = require('sequelize')
const database = require('../database')

const Transaction = database.define('transaction', {
  transaction_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  accountAccountNumber: {
    type: DataTypes.INTEGER,
  },
  amount: DataTypes.INTEGER,
  type: DataTypes.STRING,
  date: DataTypes.DATEONLY,
}, { createdAt: false, updatedAt: false, deletedAt: false })

Transaction.sync()

module.exports = Transaction