require('dotenv').config()
const express = require('express')

const loginRoute = require('./login/route')
const usersRoute = require('./users/route')
const config = require('./config')

const app = express()
app.use(express.json())

app.use('/login', loginRoute)
app.use('/api', usersRoute)

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`)
})
