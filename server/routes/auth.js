const router = require('express').Router()
const {
  registerUser,
  loginUser,
  requireLogin
} = require('../controllers/Auth/Auth')

//TO REGISTER A USER
router.post('/register', registerUser)

// TO LOGIN A USER
router.post('/login', loginUser)

router.post('/profile', requireLogin, (req, res) => {
  res.status(200).json({ user: 'profile' })
})

module.exports = router
