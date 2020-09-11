const express = require('express')

const { validateLogin } = require('./validate')
const { getUserFromEmailAddress } = require('./controller')
const { comparePassword } = require('../middleware/hash')
const { signToken } = require('../middleware/sign-token')

const router = express.Router()

router.post('/',
  validateLogin,
  getUserFromEmailAddress,
  comparePassword,
  signToken
)

module.exports = router
