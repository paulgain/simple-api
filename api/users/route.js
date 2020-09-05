const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/jwt/verify-token')
const { hashPassword } = require('../middleware/hash')

const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  newUserEmailAddressCheck,
} = require('./controller')

const {
  validateId,
  validateNewUser,
  validateExistingUser,
} = require('./validate')

// Create a new User
router.post('/users', 
  validateNewUser,
  newUserEmailAddressCheck,
  hashPassword,
  createUser
)

// Protected routes
router.get('/users/:id', verifyToken, validateId, getUser)
router.get('/users', verifyToken, getUsers)
router.put('/users/:id', verifyToken, validateExistingUser, updateUser)
router.delete('/users/:id', verifyToken, validateId, deleteUser)

module.exports = router
