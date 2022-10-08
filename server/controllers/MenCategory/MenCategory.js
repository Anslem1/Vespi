const menCategory = require('../../models/MenCategoy')
const slugify = require('slugify')

function createMenCategories (menCategories, parentId = null) {
  const menCategoryList = []
  let menCategory
  if (parentId == null) {
    menCategory = menCategories.filter(cat => cat.parentId == undefined)
  } else {
    menCategory = menCategories.filter(cat => cat.parentId == parentId)
  }
  for (let cate of menCategory) {
    menCategoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createMenCategories(menCategories, cate._id)
    })
  }
  return menCategoryList
}

// CREATE A CATEGORY
exports.createMenCategory = async (req, res) => {
  try {
    const menCategoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name)
    }
    if (req.body.parentId) {
      menCategoryObj.parentId = req.body.parentId
    }

    const menCate = new menCategory(menCategoryObj)
    menCate.save((err, menCategory) => {
      if (err) return res.status(500).json(err)
      if (menCategory) return res.status(200).json({ menCategory })
    })
  } catch (err) {
    return res.status(500).json(err)
  }
}

//GET A CATEGORY
exports.getMenCategory = (req, res) => {
  try {
    menCategory.find({}).exec((err, menCategories) => {
      if (err) return res.status(500).json(err)
      if (menCategories) {
        const menCategoryList = createMenCategories(menCategories)
        return res.status(200).json(menCategoryList)
      }
    })
  } catch (err) {
    return res.status(400).json(err)
  }
}
