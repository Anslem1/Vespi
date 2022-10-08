const mongoose = require('mongoose')
const Schema = mongoose.Schema

const womenCategory = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    womenCategoyImage: { type: String },
    womenCategoyDesc: { type: String },
    parentId: { type: String },
    // refPath: 'Post'
  },
  { timestamps: true }
)

module.exports = mongoose.model('womenCategory', womenCategory)
