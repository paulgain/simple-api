require('dotenv').config()
const express = require('express')

const { 
  logger,
  httpLogger,
  httpErrorLogger
} = require('./config/logger')

const loginRoute = require('./login/route')
const usersRoute = require('./users/route')
const config = require('./config')

const app = express()
app.use(express.json())

app.use(httpLogger);

app.use('/login', loginRoute)
app.use('/api', usersRoute)

app.use(httpErrorLogger);

app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`)
})
