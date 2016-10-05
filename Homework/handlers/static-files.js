let fs = require('fs')
let url = require('url')
let path = require('path')
let http = require('http')
function getContentType (url) {
  let contentType = ''
  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (url.endsWith('.jpg')) {
    contentType = 'image/jpeg'
  } else if (url.endsWith('.html')) {
    contentType = 'text/html'
  }

  return contentType
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  console.log(req.headers.host)
  console.log(process.env.PWD)
  if (req.pathname.startsWith('/content')) {
    fs.readFile('.' + req.pathname, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.write('404 NOT FOUND')
        res.end()
        return true
      }
      let contentType = getContentType(req.pathname)
      if (!contentType) {
        res.writeHead(400)
        res.write('400 BAD REQUEST')
        res.end()
        return true
      }
      res.writeHead(200, {
        'Content-Type': contentType
      })
      let filename = url.parse(req.url).pathname.split('/')[2]
      let fullFilename = filename + '.' + url.parse(req.url).pathname.split('.')[1]
      let file = fs.createWriteStream(fullFilename)
      let p = 'http://' + req.headers.host + req.pathname
      console.log(p)
      res.write(data)
      fs.writeFile(fullFilename, data, 'ascii', (err) => {
        if (err) console.log(err)
      })
      res.end()
    })
  } else {
    fs.readFile(path.join(__dirname, '../content/error.html'), (err, data) => {
      if (err) console.log(err)

      res.writeHead(404, {
        'Content-Type': getContentType(req.pathname)
      })
      res.write(data)
      res.end()
    })
  }
}
