const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    parentId: { type: String }
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

module.exports = mongoose.model('Category', CategorySchema)
