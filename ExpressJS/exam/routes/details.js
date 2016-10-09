var express = require('express')
var router = express.Router()
let articles = require('../public/javascripts/articles.js')
let deleted = require('../public/javascripts/deleted-articles.js')
let fs = require('fs')
let path = require('path')
let views = require('../public/javascripts/views.js')
/* GET home page. */
router.get('/:id', function (req, res, next) {
  let id = req.params.id
  let article = articles.filter((article) => {
    return article.id == id
  })
  if (!views[id]) {
    views[id] = 0
  }
  req.checkBody('comment', 'Comment should not be empty').notEmpty()
  req.checkBody('username', 'Username should not be empty').notEmpty()

  Object.assign(article[0].views, article[0].views++)
  console.log(article[0].image)
  res.render('details', {
    id: req.params.id,
    title: article[0].title,
    description: article[0].description,
    status: article[0].status,
    comments: article[0].comments,
    views: article[0].views,
    image: article[0].image
  })
})

router.put('/', (req, res, next) => {
  let id = req.body.id
  console.log(req.body)
  let article = articles.filter((article) => {
    return article.id == id
  })
  let status = 'DELETE'
  if (article[0].status == 'DELETE') {
    status = 'UNDELETE'
    articles.pop(article[0])
    deleted.push(article[0])
    Object.assign(article[0], {status: status})
  } else {
    deleted.pop(article[0])
    articles.push(article[0])
    Object.assign(article[0], {status: status})
  }
})

router.post('/:id/comment', (req, res, next) => {
  let id = req.params.id
  let article = articles.filter(todo => {
    return todo.id == id
  })
  let comment = {
    text: req.body.comment,
    date: new Date()
  }
  if (comment) {
    article[0].comments.push(comment)
  }

  req.checkBody('comment', 'Comment should not be empty!').notEmpty()
  req.checkBody('username', 'Username should not be empty!').notEmpty()

  let errors = req.validationErrors()
  if (errors) {
    res.render('details', {
      errors: errors
    })
  } else {
    res.render('index')
  }})
module.exports = router
