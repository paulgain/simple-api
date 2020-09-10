const logger = require('../config/logger')
class NotFoundError extends Error {
  constructor() {
    super('Not Found')
    this.statusCode = 404
  }
}

const notFound = (req, res, next) => {
  next(new NotFoundError())
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
  NotFoundError,
}
