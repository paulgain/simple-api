const model = require('../model/users')

const createUser = async (req, res, next) => {
  try {
    const user = await model.createUser(Object.values(req.body))
    res.status(201).send(user)
  } catch (error) {
    const message = error.message || 'Some error occurred while creating a User'
    res.status(500).send({ message })
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await model.getUser(req.params.id)
    res.send(user)
  } catch (error) {
    if (error.statusCode === 400) {
      res.status(400).send({ message: `Not found User with id ${req.params.id}` })
    } else {
      res.status(500).send({ message: `Error retrieving User with id ${req.params.id}` })
      next(error)
    }
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await model.getUsers()
    res.send(users)
  } catch (error) {
    const message = error.message || 'An error occurred while retrieving Users' 
    res.status(500).send({ message });
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = [req.params.id, ...Object.values(req.body)]
    const updatedUser = await model.updateUser(user)
    res.send(updatedUser)
  } catch (error) {
    if (error.statusCode === 400) {
      res.status(400).send({ message: `Not found User with id ${req.params.id}` })
    } else {
      res.status(500).send({ message: `Error User with id ${req.params.id}` });
      next(error)
    }
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await model.deleteUser(req.params.id)
    res.send({ message: 'User was deleted successfully!' })
  } catch (error) {
    if (error.statusCode === 400) {
      res.status(400).send({ message: `Not found User with id ${req.params.id}` })
    } else {
      res.status(500).send({ message: `Could not delete User with id ${req.params.id}` })
      next(error)
    }
  }
}

const newUserEmailAddressCheck = async (req, res, next) => {
  try {
    await model.getUserFromEmailAddress(req.body.emailAddress)
    res.status(409).send({ message: 'Email address has been taken' })
  } catch (error) {
    if (error.statusCode === 400) {
      next()
    } else {
      res.status(500).send({ message: 'Error fetching User from email address' })
      next(error)
    }
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  newUserEmailAddressCheck,
}
