const User = require('../../models/User')
const Post = require('../../models/Post')
const bcrypt = require('bcrypt')

exports.getUser = async (req, res) => {
  try {
    const user = User.findById(req.params.id)
    const { password, ...creds } = user._doc
    return res.status(200).json(creds)
  } catch (err) {
    return res.status(500).json({ err: 'User not found' })
  }
}

exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(12)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      )
      return res.status(200).json(updatedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.status(401).json('Action not allowed')
  }
}

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      try {
        await Post.deleteMany({ username: user.username })
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json('User Deleted')
      } catch (err) {
        return res.status(500).json(err)
      }
    } catch (err) {
      res.status(404).json('We could not find the user')
    }
    ;('Action not allowed')
  }
}
  