const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menCategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    menCategoyImage: { type: String },
    menCategoyDesc: { type: String },
    parentId: { type: String },
// refPath: 'Post'

  },
  { timestamps: true }
)

//
// category: [
//   {
//     men: [
//       { jeans: [{
// img: "",
//   desc: "",
//   caption: "",

// }] },
// //       { sweater: [{}] },
//       {
//         sweater: ['Clothing', 'clothing', 'clothing']
//       },
//       {
//         sweater: ['Clothing', 'clothing', 'clothing']
//       }
//     ]
//   },
//   {
//     women: [
//       { jeans: ['pictures', 'pictures', 'pictures', 'pictures'] },
//       {
//         sweater: ['Clothing', 'clothing', 'clothing']
//       },
//       {
//         sweater: ['Clothing', 'clothing', 'clothing']
//       }
//     ]
//   }
// ]

module.exports = mongoose.model('menCategory', menCategorySchema)
