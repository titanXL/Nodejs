module.exports = function (linksArray) {
  let body = '<!DOCTYPE html><html><header></header><body>'
  for (let link of linksArray) {
    body += '<a href="'

    body += link.details

    body += '">'
    body += link.name
    body += '</a>'
    body += '<br>'
  }
  body += '</body></html>'
  return body
}
