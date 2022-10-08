const womenCategory = require('../../models/WomenCategory')
const slugify = require('slugify')

function createWomenCategories (womenCategories, parentId = null) {
  const categoryList = []
  let womenCategory
  if (parentId == null) {
    womenCategory = womenCategories.filter(cat => cat.parentId == undefined)
  } else {
    womenCategory = womenCategories.filter(cat => cat.parentId == parentId)
  }
  for (let cate of womenCategory) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createWomenCategories(womenCategories, cate._id)
    })
  }
  return categoryList
}

// CREATE A CATEGORY
exports.createWomenCategory = async (req, res) => {
  try {
    const womenCategoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name)
    }
    if (req.body.parentId) {
      womenCategoryObj.parentId = req.body.parentId
    }

    const womenCate = new womenCategory(womenCategoryObj)
    womenCate.save((err, womenCategory) => {
      if (err) return res.status(500).json(err)
      if (womenCategory) return res.status(200).json(womenCategory)
    })
  } catch (err) {
    return res.status(500).json(err)
  }
}

//GET A CATEGORY
exports.getWomenCategory = (req, res) => {
  try {
    womenCategory.find({}).exec((err, womenCategories) => {
      if (err) return res.status(500).json(err)
      if (womenCategories) {
        const womenCategoryList = createWomenCategories(womenCategories)
        return res.status(200).json(womenCategoryList)
      }
    })
  } catch (err) {
    return res.status(400).json(err)
  }
}
