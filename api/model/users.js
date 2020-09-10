const { isEmpty } = require('lodash')

const { NotFoundError } = require('../middleware/errors')
const db = require('../db')

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    db.query('call createUser(?,?,?,?, ?)', user, (error, results) => {
      error ? reject(error) : resolve(results[0][0])  
    })
  });
}

const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('call getUser(?)', userId, (error, results) => {
      if (error) {
        return reject(error)
      }

      if (!results[0].length) {
        return reject(new NotFoundError()) 
      }

      resolve(results[0])
    })
  });
}

const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('call getUsers()', (error, results) => {
      error ? reject(error) : resolve(results[0])  
    })
  })
}

const updateUser = (user) => {
  return new Promise((resolve, reject) => {
    db.query('call updateUser(?,?,?,?,?)', user, (error, results) => {
      if (error) {
        return reject(error)
      }

      if (!results[0].length) {
        return reject(new NotFoundError())
      }
      
      resolve(results[0])
    })
  })
}

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('call deleteUser(?)', userId, (error, results) => { 
      if (error) {
        return reject(error)
      }

      if (results.affectedRows === 0) {
        return reject(new NotFoundError()) 
      }
        
      resolve()
    })
  })
}

const getUserFromEmailAddress = (emailAddress) => {
  return new Promise((resolve, reject) => {
    db.query('call getUserFromEmailAddress(?)', emailAddress, (error, results) => {
      if (error) {
        return reject(error)
      }

      const user = results[0][0] 

      if (isEmpty(user)) {
        return reject(new NotFoundError()) 
      }

      resolve({ ...user })
    })
  })
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserFromEmailAddress,
}
