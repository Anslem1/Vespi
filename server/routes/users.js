const router = require('express').Router()
const { getUser, updateUser, deleteUser } = require('../controllers/Users/User')

//TO SEARCH/GET/READ A USER BY ID
router.get('/:id', getUser)

// TO UPDATE USERS CREDENTIALS
router.put('/:id', updateUser)

// To DELETE  A USER
router.delete('/:id', deleteUser)

module.exports = router
