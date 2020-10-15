require('dotenv').config()
const express = require('express')

const errors = require('./middleware/errors')
const logger = require('./config/logger')
const httpLogger = require('./config/httpLogger')

// Routes
const healthCheckRoute = require('./healthcheck/route')
const loginRoute = require('./login/route')
const usersRoute = require('./users/route')
const config = require('./config')

const app = express()

app.use(express.json())
app.use(httpLogger)

app.use('/healthcheck', healthCheckRoute)
app.use('/login', loginRoute)
app.use('/api', usersRoute)

app.use(errors.notFound)
app.use(errors.catchAll)

app.listen(config.server.port, () => {
  logger.info(`Server listening on port ${config.server.port}`)
})
