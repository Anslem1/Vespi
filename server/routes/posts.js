const router = require('express').Router()
const { createPost, getAllPost } = require('../controllers/Posts/Posts')
const {
  getPostById,
  upDatePostById,
  deletePostById
} = require('../controllers/Posts/Post.By.Id')

const shortId = require('shortid')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, shortId.generate() + '_' + file.originalname)
  }
})
const upload = multer({ storage })

// TO CREATE A JOURNAL
router.post('/', upload.single('postImage'), createPost)
//GET ALL THE JOURNAL
router.get('/', getAllPost)

//TO GET A JOURNAL BY ID

router.get('/:id', getPostById)

// TO UPDATE A JOURNAL BY ID

router.put('/:id', upDatePostById)

// To DELETE A POST BY ID

router.delete('/:id', deletePostById)

module.exports = router
