const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

const app = express()

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')

app.use(express.json())

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Mongo working?'))
  .catch(err => console.log(err))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('file uploaded')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/journals', postRoute)
app.use('/api/categories', categoryRoute)
// app.use('/api/categories/men', menCategories)
// app.use('/api/categories/women', womenCategories)

app.listen('5000', () => {
  console.log('We running backend. Port: 5000')
})
