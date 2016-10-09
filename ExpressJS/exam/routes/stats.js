var express = require('express')
var router = express.Router()
let articles = require('../public/javascripts/articles.js')
let deleted = require('../public/javascripts/deleted-articles')
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.headers['authorization'] === 'Admin') {
    articles.sort((a, b) => {
      return a.views > b.views
    })
    let views = 0
    articles.forEach(article => {
      views += article.views
    })

    res.render('stats', {
      articles: articles,
      deleted: deleted,
      views: views
    })
  }
})

module.exports = router
