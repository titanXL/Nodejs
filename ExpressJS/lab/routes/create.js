let express = require('express')
let router = express.Router()
let multer = require('multer')
let upload = multer({dest: 'public/images'})
let todoList = require('../public/javascripts/utils.js')
let fs = require('fs')

router.get('/', (req, res, next) => {
  res.render('create')
})

router.post('/', upload.single('avatar'), (req, res, next) => {
  
  let title = req.body.title
  let description = req.body.description
  let id = todoList.length
 
  let file = fs.createWriteStream(req.file.filename)
  res.pipe(file)
  let todo = {
    id: id,
    title: title,
    description: description,
    status: 'Pending',
    comments: []
  }
  
  todoList.push(todo)
  todoList.sort((a, b) => {
    return a.status < b.status
  })
  req.checkBody('title', 'Title field is required').notEmpty()
  req.checkBody('description', 'Description field is required').notEmpty()

  let errors = req.validationErrors()
  if (errors) {
    res.render('create', {
      errors: errors,
      title: title,
      description: description
    })
  } else {
    res.render('index')
  }
})

module.exports = router
