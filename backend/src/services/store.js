const path = require('path')
const imageSize = require('image-size')
const fs = require('fs')
const Store = require('../models/Store')

const persistStore = async (file, slug) => {
  if (!file) {
    throw new Error('No banner provided')
  }

  const filePath = file.path
  const originalFileName = file.originalname

  if (!(path.extname(originalFileName).toLowerCase() === ".jpg")) {
    fs.unlinkSync(filePath)
    throw new Error('Only JPG files are allowed')
  }

  const bannerDimensions = imageSize(filePath)

  if (bannerDimensions.width !== 343 || bannerDimensions.height !== 430) {
    fs.unlinkSync(filePath)
    throw new Error('Banner dimensions should be 343x430')
  }

  if (slug.length > 30) {
    fs.unlinkSync(filePath)
    throw new Error('Slug is too long')
  }

  const specialCharRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

  if (specialCharRegex.test(slug)) {
    fs.unlinkSync(filePath)
    throw new Error('Slug contains special characters')
  }

  const store = await Store.findOne({slug})

  if (!store) {
    const newStorePayload = new Store({
      slug,
      banner_url: filePath
    })

    const newStore = await newStorePayload.save()

    return newStore
  } else {
    const updatedStore = await Store.findOneAndUpdate({slug}, {banner_url: filePath})

    return {...updatedStore._doc, banner_url: filePath}
  }
}

module.exports = {persistStore}