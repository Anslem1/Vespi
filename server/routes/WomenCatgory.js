const {
  createWomenCategory, getWomenCategory
} = require('../controllers/WomenCategory/WomenCategory')

const router = require('express').Router()

// CREATE A CATEGORY
router.post('/', createWomenCategory)

//GET A CATEGORY
router.get('/', getWomenCategory)

module.exports = router
