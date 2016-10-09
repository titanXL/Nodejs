var express = require('express')
var router = express.Router()
let articles = require('../public/javascripts/articles.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  let filteredArticles = articles.filter(article => {
    return article.status !== 'UNDELETE'
  })
  filteredArticles.sort((a, b) => {
    return a.views > a.views
  })
  let result = []
  for (let i = 0; i < 6; i++) {
    result.push(filteredArticles[i])
  }
  res.render('index', {
    articles: articles || []
  })
})

module.exports = router
