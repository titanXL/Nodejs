var express = require('express')
var router = express.Router()
let todoList = require('../public/javascripts/utils.js')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('all', {
    todoList: todoList
  })
})

module.exports = router
