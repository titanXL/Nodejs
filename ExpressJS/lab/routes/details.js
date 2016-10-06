var express = require('express')
var router = express.Router()
let todoList = require('../public/javascripts/utils.js')
/* GET home page. */
router.get('/:id', function (req, res, next) {
  console.log(req.params.id)
  let todo = todoList.filter((todo) => {
    return todo.id == req.params.id
  })
  console.log(todo)
  res.render('details', {
    title: todo[0].title,
    description: todo[0].description,
    status: todo[0].status,
    id: req.params.id
  })
})

router.put('/', (req, res, next) => {
  let id = req.body.id
  console.log(req.body)
  let todo = todoList.filter((todo) => {
    return todo.id == id
  })
  let status = 'DONE'
  if (todo[0].status == 'DONE') {
    status = 'PENDING'
  }
  Object.assign(todo[0], {status: status})
})

router.post('/:id/comment', (req, res, next) => {
  let id = req.params.id
  let todo = todoList.filter(todo => {
    return todo.id == id
  })
  console.log(todo)
  console.log(todo[0].comments)
  let comment = {
    text: req.body.comment,
    date: new Date()
  }
  if (comment) {
    todo[0].comments.push(comment)
  }

  req.checkBody('comment', 'Comment should not be empty!').notEmpty()
  let errors = req.validationErrors()
  if (errors) {
    res.render('comment', {
      errors: errors,
      comments: todo[0].comments.text
    })
  } else {
    res.render('comment', {
      errors: [],
      comments: todo[0].comments
    })
  }
})

module.exports = router
