let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')
app.use(express.static('public'))

app.get('/images/goku.jpg', (req, res) => {
  res.setHeader('Content-Type', 'images/jpeg')
  fs.createReadStream('./image').pipe(res)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
