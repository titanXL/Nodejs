let express = require('express')
let router = express.Router()
let articles = require('../public/javascripts/articles.js')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('all', { articles: articles })
})

module.exports = router
