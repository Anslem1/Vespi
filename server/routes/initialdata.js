const { initialData, getPostUnderCategory } = require('../controllers/initialdata/iInitialdata');

const router = require('express').Router()

//TO REGISTER A USER
router.post('/initialdata', initialData)


module.exports = router
