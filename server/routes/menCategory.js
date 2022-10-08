const {
  createMenCategory,
  getMenCategory
} = require('../controllers/MenCategory/MenCategory')

const router = require('express').Router()

// CREATE A CATEGORY
router.post('/', createMenCategory)

//GET A CATEGORY
router.get('/', getMenCategory)

module.exports = router
