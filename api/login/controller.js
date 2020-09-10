const model = require('../model/users')

const getUserFromEmailAddress = async (req, res, next) => {
  try {
    req.user = await model.getUserFromEmailAddress(req.body.emailAddress)
    next()
  } catch (error) {
    if (error.statusCode === 400) {
      res.status(401).send({ message: 'Email and password do not match' })
    } else {
      res.status(500).send({ message: 'Error fetching User from email address' })
    }
  }
}

module.exports = {
  getUserFromEmailAddress
}
