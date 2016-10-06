var express = require('express')
var router = express.Router()
let todoList = require('../public/javascripts/utils.js')

router.get('/', function (req, res, next) {
  if (req.headers['My-authorization'] == 'Admin') {
    let length = todoList.length
    console.log(req.headers)
    console.log(length)
    let comments
    if (todoList.length > 1) {
      for (let i = 0; i < todoList.length; i++) {
        comments += todoList[i].comments.length
      }
    } else {
      comments = todoList[0].comments.length
    }
    console.log(todoList.length)
    console.log(todoList.reduce((a, b) => {
      return a.comments.length + b.comments.length
    }))
    res.render('stats', {
      todos: length,
      comments: comments
    })
  } })

module.exports = router
