const { createLogger, transports, format } = require('winston')
const expressWinston = require('express-winston')
const config = require('./')

const MESSAGE = "HTTP {{res.statusCode}} {{req.method}} {{req.url}} response_time={{res.responseTime}}"

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
      format: format.combine(
        format.colorize({ all: true }),
        format.splat(),
        format.simple(),
      ),
    })
  ],
});

const httpOptions = {
  msg: MESSAGE,
  metaField: 'detail',
  winstonInstance: logger,
}

const httpLogger = expressWinston.logger({ 
  ...httpOptions,
  meta: true,
})

const httpErrorLogger = expressWinston.errorLogger({
  ...httpOptions,
  blacklistedMetaFields: [
    'process',
    'os',
    'trace',
  ]
});

module.exports = {
  logger,
  httpLogger,
  httpErrorLogger
}
