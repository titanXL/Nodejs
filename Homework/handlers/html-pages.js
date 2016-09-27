let fs = require('fs')
let url = require('url')
let path = require('path')
let formidable = require('formidable')
let userInput = require('../content/utils/user-input.js')
let buildHtml = require('../content/utils/build-html.js')
let buildDetails = require('../content/utils/build-details.js')
let Handlebars = require('handlebars')
module.exports = (req, res) => {
  var contentType = 'text/html'
  let reqId = req.pathname.split('/')[3]
  req.pathname = req.pathname || url.parse(req.url).pathname
  console.log(req.headers)
  if (req.headers.statusheader === 'Full') {
    if (req.pathname === '/status') {
      if (req.method === 'GET') {
        fs.readFile(path.join(__dirname, '../content/status.html'), 'utf-8', (err, data) => {
          if (err) console.log(err)
          res.writeHead(200, {
            'Content-Type': contentType
          })
          let count = userInput.length
          let template = Handlebars.compile(data)
          let siteData = {
            'count': count
          }
          res.end(template(siteData))
        })
      }
    }
  } else if (req.pathname === '/') {
    fs.readFile(path.join(__dirname, '../content/home.html'), (err, data) => {
      if (err) console.log(err)

      res.writeHead(200, {
        'Content-Type': contentType
      })
      res.write(data)
      res.end()
    })
  } else if (req.pathname === '/details') {
    if (req.method === 'GET') {
      let site = buildHtml(userInput)
      res.writeHead(200, {
        'Content-Type': contentType
      })
      res.write(site)
      res.end()
    }
  } else if (req.pathname === '/input') {
    if (req.method === 'GET') {
      fs.readFile(path.join(__dirname, '../content/input.html'), (err, data) => {
        if (err) console.log(err)

        res.writeHead(200, {
          'Content-Type': contentType
        })
        res.write(data)
        res.end()
      })
    } else if (req.method === 'POST') {
      let form = new formidable.IncomingForm()
      form.parse(req, (err, fields, file) => {
        if (err) console.log(err)
        res.writeHead(302, {
          'Location': '../content/images.html'
        })
        if (fields.name === '' || fields.url === '') {
          res.write('ERROR')
        } else {
          let obj = {}
          obj.name = fields.name
          obj.url = fields.url
          obj.id = new Date().valueOf()
          obj.details = '/images/details/' + obj.id
          userInput.push(obj)
        }
        console.log(userInput)
        res.end()
      })
    }
  } else if (req.pathname === '/images/details/' + reqId) {
    let site = buildDetails(userInput, reqId)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(site)
    res.end()
  } else {
    return true
  }
}
