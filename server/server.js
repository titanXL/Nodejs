var fs = require('fs')

fs.readFile('input.txt', (err, data) => {
    if (err) console.error(err)

    console.log(data.toString())
})

console.log('Program ended')