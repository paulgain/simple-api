const { createLogger, transports, format } = require('winston')

const config = require('./')

const logger = createLogger({
  level: config.logLevel,
  exitOnError: true,
  transports: [
    new transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      format: format.combine(
        format.colorize({ all: true }),
        format.splat(),
        format.simple(),
      ),
    })
  ],
});

module.exports = logger
