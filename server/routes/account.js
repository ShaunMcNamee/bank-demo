const express = require('express')
const router = express.Router()
const Account = require('../models/Account')
const Transaction = require('../models/Transaction')

const MAX_DEPOSIT = 1000 // Maximum in one deposit
const MAX_WITHDRAWAL = 200 // Maximum in one withdrawal
const MAX_DAILY_WITHDRAWAL = 400 // Maximum withdrawal in one day
const WITHDRAWAL_DIVISOR = 5 // smallest bill we can use

Account.hasMany(Transaction)
Transaction.belongsTo(Account)

router.get('/:id', async (req, res, next) => {
  const account = await Account.findByPk(req.params.id)
  res.json(account)
})

router.post('/:id/withdrawal', async (req, res, next) => {
  const account = await Account.findByPk(req.params.id)
  const amount = Number.parseInt(req.body.amount)

  // Check for valid amount of withdrawal
  if (amount < 0) {
    res.json({ message: `${amount} is not a valid amount.` })
    return
  }

  // Check for valid amount with bills
  if (amount % WITHDRAWAL_DIVISOR !== 0) {
    res.json({ message: `$${amount} is not divisible by $${WITHDRAWAL_DIVISOR}.` })
    return
  }

  // Check for maximum
  if (amount > MAX_WITHDRAWAL) {
    res.json({ message: `$${amount} is more than the $${MAX_WITHDRAWAL} we allow for a single withdrawal.` })
    return
  }

  // Check for daily max
  const transactions = await Transaction.findAll({
    where: {
      date: new Date(),
      type: 'withdrawal',
    },
  })
  const dailyTotal = transactions.reduce((acc, curr) => {
    acc += curr.amount
    return acc
  }, 0)
  if (dailyTotal + amount > MAX_DAILY_WITHDRAWAL) {
    res.json({ message: `$${amount} put you over the $${MAX_DAILY_WITHDRAWAL} we allow for withdrawals in a day.` })
    return
  }

  // If it is a credit account, we need different rules
  if (account.type === 'credit') {
    const remainingCredit = account.credit_limit + account.amount
    if (remainingCredit < amount) {
      res.json({ message: `Taking $${amount} would put you over your credit limit.` })
      return
    }
  } else {
    // If we are here, it is not a credit account
    // Check to see if it is more than they are allowed in checking or savings
    if (account.amount < amount) {
      res.json({ message: `Not enough in account to withdraw $${amount}.` })
      return
    }
  }

  // Totally a valid amount, update the database
  account.amount = account.amount - amount
  await account.save()
  const transaction = Transaction.build({
    accountAccountNumber: account.account_number,
    amount,
    type: 'withdrawal',
    date: new Date(),
  })
  await transaction.save()
  res.json({ message: `Here is your $${amount}, have a nice day.` })
})

router.post('/:id/deposit', async (req, res, next) => {
  const account = await Account.findByPk(req.params.id)
  const amount = Number.parseInt(req.body.amount)

  // Check for valid amount of withdrawal
  if (amount < 0) {
    res.json({ message: `$${amount} is not a valid amount.` })
    return
  }

  // Check for maximum
  if (amount > MAX_DEPOSIT) {
    res.json({ message: `$${amount} is more than the $${MAX_DEPOSIT} we allow for deposits.` })
    return
  }

  // If it is a credit account, we need different rules
  if (account.type === 'credit') {
    const remainingCredit = account.credit_limit + account.amount
    if (account.amount + amount > 0) {
      res.json({ message: `You cannot deposit $${amount}, that is more than you owe.` })
      return
    }
  }

  // Totally a valid amount, update the database
  account.amount = account.amount + amount
  await account.save()
  const transaction = Transaction.build({
    accountAccountNumber: account.account_number,
    amount,
    type: 'deposit',
    date: new Date(),
  })
  await transaction.save()
  res.json({ message: `Thanks for the $${amount}, have a nice day.` })
})

module.exports = router