const User = require('../../models/User')
const bcrypt = require('bcrypt')

exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    const user = (await User.findOne({ username: req.body.username }))
      ? 'Username already exists'
      : await newUser.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    const { password, ...userCreds } = user._doc
    const validated = await bcrypt.compare(req.body.password, user.password)

    !user || !validated
      ? res.status(400).json('Wrong username or password')
      : res.status(200).json(userCreds)

    // if (!user) {
    //   return res.status(400).json('Wrong credentials')
    // }
    // const validated = await bcrypt.compare(req.body.password, user.password)

    // if (!validated) {
    //   return res.status(400).json('Wrong credentials')
    // }

    // res.status(200).json(userCreds)
  } catch (err) {
    return res.status(500).json(err)
  }
}
