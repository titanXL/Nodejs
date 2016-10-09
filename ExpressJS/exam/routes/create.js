let express = require('express')
let router = express.Router()
let articles = require('../public/javascripts/articles.js')
let multer = require('multer')
let path = require('path')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
let upload = multer({storage: storage})
router.get('/', function (req, res, next) {
  res.render('create')
})

router.post('/', upload.single('picture'), (req, res, next) => {
  let title = req.body.title
  let description = req.body.description
  let id = articles.length
  let file = req.file.originalname
  console.log(file)
  let article = {
    id: id,
    title: title,
    description: description,
    status: 'DELETE',
    comments: [],
    views: 0,
    image: req.file.originalname

  }

  articles.push(article)
  articles.sort((a, b) => {
    return a.id > b.id
  })
  req.checkBody('title', 'Title field is required').notEmpty()
  req.checkBody('description', 'Description field is required').notEmpty()
  req.checkBody('picture','There should be a picture').notEmpty()

  let errors = req.validationErrors()
  if (errors) {
    res.render('create', {
      errors: errors,
      title: title,
      description: description
    })
  } else {
    res.render('create')
  }
})

module.exports = router
