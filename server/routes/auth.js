const router = require('express').Router()
const { registerUser, loginUser } = require('../controllers/Auth/Auth')

//TO REGISTER A USER
router.post('/register', registerUser)


// TO LOGIN A USER
router.post('/login', loginUser)

module.exports = router
