const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    slug: {
      type: String,
      unique: true,
      required: true
    },

    caption: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    postImage: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
     