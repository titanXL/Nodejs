module.exports = function (userInput, id) {
  let body = '<!DOCTYPE html><html><header></header><body>'
  body += '<div>'
  let searchedID = userInput.filter((image) => image.id == id)[0]
  let src = searchedID.url
  body += `<img src=${src}>`
  body += '</div>'
  body += '</body></html>'
  return body
}
