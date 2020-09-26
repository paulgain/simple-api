const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const ID = Joi.string().regex(/^\d+$/).required()
const NAME = Joi.string().min(2).max(45).required()
const DOB = Joi.date().format('YYYY-MM-DD').required()
const EMAIL = Joi.string().email().required()
const PASSWORD = Joi.string()
  .regex(/^[a-z]{8}$/) // Keep it simple for dev purposes!
  .required()

module.exports = {
  ID,
  NAME,
  DOB,
  EMAIL,
  PASSWORD,
}
