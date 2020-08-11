const Joi = require('@hapi/joi')

const {
  EMAIL,
  PASSWORD
} = require('../const')

const LOGIN = Joi.object({
  emailAddress: EMAIL,
  password: PASSWORD,
})

const validateLogin = (req, res, next) => {
  const { error } = LOGIN.validate(req.body) 
  error ? res.status(400).send(error.message) : next()
}

module.exports = {
  validateLogin
}
