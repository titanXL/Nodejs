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
    title: todo.title,
    description: todo.description,
    status: todo.status
  })
})

module.exports = router
