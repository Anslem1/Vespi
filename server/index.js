const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

const app = express()

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')
const initialData = require('./routes/initialdata')

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))
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
    console.log(req.body.file)
    cb(null, req.body.file)
  }  
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('file uploaded')
})

app.use(cors())
app.use('/api/auth', authRoute)
app.use('/api', initialData)
app.use('/api/users', userRoute)
app.use('/api/journals', postRoute)
app.use('/api/categories', categoryRoute)

app.listen('5000', () => {
  console.log('We running backend. Port: 5000')
})
