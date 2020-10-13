const db = require('../db')

const healthCheck = () => {
  return new Promise((resolve, reject) => {
    db.ping((error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}

module.exports = {
  healthCheck,
}
