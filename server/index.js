const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const account = require('./routes/account')

const PORT = process.env.PORT || 3000

const app = express()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/account', account)

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})