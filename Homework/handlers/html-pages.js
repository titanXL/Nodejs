let fs = require('fs')
let url = require('url')
let path = require('path')
let multiparty = require('multiparty')
let userInput = require('../content/utils/user-input.js')
let buildHtml = require('../content/utils/build-html.js')
let buildDetails = require('../content/utils/build-details.js')
let Handlebars = require('handlebars')
module.exports = (req, res) => {
  var contentType = 'text/html'
  let reqId = req.pathname.split('/')[3]
  req.pathname = req.pathname || url.parse(req.url).pathname
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
      let form = new multiparty.Form()
      form.parse(req)
      form.on('part', (part) => {
        if (part.filename) {
          if (!fs.exists(path.join(__dirname, '../content/' + part.filename.split('.')[0]))) {
            fs.mkdir(path.join(__dirname, '../content/' + part.filename.split('.')[0]))
          }
          let directory = path.join(__dirname, '../content/' + part.filename.split('.')[0])
          console.log(directory)
          let file = []
          part.setEncoding('binary')
          part.on('data', (data) => { file.push(data) })
          part.on('end', () => {
            let destination = directory + '/' + part.filename
            fs.writeFile(destination, file, 'ascii', (err) => {
              if (err) console.log(err)
              res.writeHead(200)
              res.write(part.filename)
              res.end()
            }) })
        } else {
          part.resume()
        }
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
