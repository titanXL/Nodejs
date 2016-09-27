let fs = require('fs')
let url = require('url')
let path = require('path')
module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  if (req.pathname === '/favicon.ico') {
    fs.readFile(path.join(__dirname, '../content/favicon.ico'), (err, data) => {
      if (err) console.log(err)
      res.writeHead(200, {
        'Content-Type': 'image/x-icon'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
