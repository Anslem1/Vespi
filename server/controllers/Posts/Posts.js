const Post = require('../../models/Post')
const slugify = require('slugify')

//CREATE  A POST

exports.createPost = async (req, res) => {
  const { username, caption, desc, postImage, category } = req.body

  const newPost = new Post({
    username: username,
    slug: slugify(username),
    postImage: req.file.filename,
    caption,
    desc,
    category
  })

  newPost.save((err, post) => {
    err && res.status(400).json({ err })
    if (post) {
      res.status(201).json({ post })
    }
  })

  // try {
  //   const savedPost = await newPost.save()
  //   return res.status(200).json(savedPost)
  // } catch (err) {
  //   return res.status(500).json(err)
  // }

  // res.status(200).json({ file: req.file, body: req.body })
}

// GET ALL POSTS

exports.getAllPost = async (req, res) => {
  const username = req.query.user
  const categoryName = req.query.category

  console.log(categoryName)

  try {
    let posts
    if (username) {
      posts = await Post.find({ username })
    } else if (categoryName) {
      posts = await Post.find({
        category: [
          {
            $in: [categoryName]
          }
        ]
      })
    } else {
      posts = await Post.find()
    }
    return res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
}
