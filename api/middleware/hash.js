const bcrypt = require('bcrypt')
const config = require('../config/index')

const hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, config.bcrypt.saltRounds, (error, hash) => {
    if (error) {
      return res.status(500).send({ message: 'Error hashing password' })
    }

    req.body.password = hash

    next()
  })
}

const comparePassword = (req, res, next) => {
  bcrypt.compare(req.body.password, req.user.password, (error, hasMatched) => {
    if (error) {
      return res.status(500).send({ message: 'Error comparing password' })
    }

    hasMatched
      ? next()
      : res.status(401).send({ message: 'Email and password do not match' })
  })
}

module.exports = {
  hashPassword,
  comparePassword,
}
