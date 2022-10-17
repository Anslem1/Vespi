const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    parentId: { type: String },
    categoryImage: { type: String },
    categoryDesc: { type: String }
  },
  { timestamps: true }
)



module.exports = mongoose.model('Category', CategorySchema)
