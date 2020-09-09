const logger = require('../config/logger')

const notFound = (req, res, next) => {
  const error = new Error()
  error.statusCode = 404
  error.statusMessage = 'Not Found'
  next(error);
}

const catchAll = (error, req, res, next) => {
  logger[error.statusCode === 404 ? 'info' : 'error']({
    statusCode: error.statusCode || 500,
    statusMessage: error.statusMessage,
    stack: error.stack
  })
}

module.exports = {
  notFound,
  catchAll,
}
