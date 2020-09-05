const logger = require('../config/logger')
const mysql = require('mysql')

const config = require('../config')

const connection = mysql.createConnection({
  host: 'db',
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  multipleStatements: true,
  dateStrings: true,
})

connection.connect((error) => {
  if (error) {
    logger.error('MySQL connection failed', error)
    return
  }

  logger.info('MySQL connected on port %s', config.mysql.port)
})

module.exports  = connection
