const express = require('express')
const multer = require('multer')
const path = require('path')
const {persist} = require('../controllers/store')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.jpg')
  }
})

const upload =  multer({storage})

router.post('/store/:slug/banners', upload.single('banner'), (req, res) => {
  return persist(req, res)
})

module.exports = router