const { createLogger, transports, format } = require('winston')
const config = require('./')

// ----------
// Log levels
// ----------
// error: 0,
// warn: 1,
// info: 2,
// http: 3,
// verbose: 4,
// debug: 5,
// silly: 6

const logger = createLogger({
  level: config.logLevel,
  exitOnError: true,
  transports: [
    new transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      format: format.combine(format.colorize({ all: true }), format.simple()),
    }),
  ],
})

module.exports = logger
