const Post = require('../../models/Post')
const slugify = require('slugify')

//CREATE  A POST

exports.createPost = async (req, res) => {
  console.log(req.body)
  const { username, caption, desc, postImage, category } = req.body

  const newPost = new Post({
    username,
    slug: slugify(username),
    postImage,
    caption,
    desc,
    category
  })

  newPost.save((err, post) => {
    err && res.status(400).json({ err })
    post && res.status(201).json({ post })
  })
}

// GET ALL POSTS

exports.getAllPost = async (req, res) => {
  const username = req.query.user
  const categoryName = req.query.category

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
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
}
