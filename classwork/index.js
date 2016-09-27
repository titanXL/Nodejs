let fs = require('fs')
let http = require('http')
var url = require('url')

http
  .createServer((req, res) => {
    var pathname = url.parse(req.url).pathname
    console.log(pathname)
    if (pathname === '/') {
      fs.readFile('index.html', (err, data) => {
        if (err) console.log(err)
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(data)
        res.end()
      })
    } else if (pathname === '/favicon.ico') {
      fs.readFile('favicon.ico', (err, data) => {
        if (err) console.log(err)
        res.writeHead(200, {
          'Content-Type': 'image/x-icon'
        })
        res.write(data)
        res.end()
      })
    } else if (pathname === '/about') {
      fs.readFile('about.html', (err, data) => {
        if (err) console.log(err)
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(data)
        res.end()
      })
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.write('404 NOT FOUND')
      res.end()
    }
  })

  .listen(1234)
