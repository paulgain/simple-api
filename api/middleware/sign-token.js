const { omit } = require('lodash')
const jwt = require('jsonwebtoken')

const config = require('../config')
const { privateKey, algorithm } = config.jwt

const signToken = async(req, res) => {
  // Remove the hashed password from the user before signing
  // otherwise it will appear in the token's payload.
  const user = omit(req.user, 'password')

  const token = jwt.sign(user, privateKey, { algorithm })
  res.send(token)
}

module.exports = {
  signToken
}
