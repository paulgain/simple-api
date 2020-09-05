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

connection.connect((err) => {
  if (err) {
    console.log("MySQL connection failed", err)
    return
  }

  console.log(`MySQL connected on port ${config.mysql.port}`)
})

connection.on('error', (err) => {
  console.log(err.code);
  console.log(err.fatal);
  console.log(err.sqlMessage)
});

module.exports  = connection
