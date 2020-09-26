const Joi = require('@hapi/joi')

const { ID, NAME, DOB, EMAIL, PASSWORD } = require('../const')

const USER = {
  firstname: NAME,
  lastname: NAME,
  dateOfBirth: DOB,
  emailAddress: EMAIL,
}

const EXISTING_USER = Joi.object({
  ...USER,
  id: ID,
})

const NEW_USER = Joi.object({
  ...USER,
  password: PASSWORD,
})

const validateId = (req, res, next) => {
  const { error } = ID.validate(req.params.id)
  error ? res.status(400).send(error.message) : next()
}

const validateExistingUser = (req, res, next) => {
  const { error } = EXISTING_USER.validate({
    id: req.params.id,
    ...req.body,
  })

  error ? res.status(400).send(error.message) : next()
}

const validateNewUser = (req, res, next) => {
  const { error } = NEW_USER.validate(req.body)
  error ? res.status(400).send(error.message) : next()
}

module.exports = {
  validateId,
  validateNewUser,
  validateExistingUser,
}
