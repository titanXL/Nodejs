let http = require('http')
let favico = require('./handlers/favico.js')
let htmlPages = require('./handlers/html-pages.js')
let staticFiles = require('./handlers/static-files.js')

http.createServer((req, res) => {
  let handlers = [
    favico,
    htmlPages,
    staticFiles
  ]
  for (let handler of handlers) {
    let next = handler(req, res)
    if (!next) {
      break
    }
  }
}).listen(1337)
