const jwt = require('jsonwebtoken')

const config = require('../../config')
const ERROR_MESSAGE = 'You\'re unauthorized to use this service'

const verifyToken = async(req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: ERROR_MESSAGE })
  }

  const token = authorization.split(' ')[1]
  
  jwt.verify(token, config.jwt.publicKey, (err, user) => {
    if(err) {
      return res.status(401).json({ error: ERROR_MESSAGE })
    }

    req.user = user
    
    next()
  });
}

module.exports = verifyToken
