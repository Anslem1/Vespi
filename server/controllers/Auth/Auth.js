const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    // const user =

    //     ? 'Username or email already exists'
    //     :

    if (
      (await User.findOne({ username: req.body.username })) ||
      (await User.findOne({ email: req.body.email }))
    ) {
     return res.status(400).json({ message: 'Username or email already exists' })
    }
    const user = await newUser.save()
     res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    // const { password, ...userCreds } = user._doc
    const validated = await bcrypt.compare(req.body.password, user.password)
    if (validated) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '100d'
      })
      const { password, ...userCreds } = user._doc
      res.cookie('token', token, { expiresIn: '100d' })
      res.status(200).json({
        token,
        userCreds
      })
    } else if (!validated || !user) {
      return res.status(400).json('Wrong username or password')
    }
  } catch (err) {
    return res.status(400).json({ error: 'Something went wrong' })
  }
}

exports.logoutUser = (req, res) => {
  res.clearCookie('token')
  return res.status(200).json({ message: 'Successfully Logged out' })
}

exports.requireLogin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const user = jwt.verify(token, process.env.JWT_SECRET)
  req.userCreds = user
  next()
}

// !user || !validated
//   ? res.status(400).json('Wrong username or password')
//   : res.status(200).json(userCreds)

// if (!user) {
//   return res.status(400).json('Wrong credentials')
// }
// const validated = await bcrypt.compare(req.body.password, user.password)

// if (!validated) {
//   return res.status(400).json('Wrong credentials')
// }

// res.status(200).json(userCreds)
