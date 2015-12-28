'use strict'

var https = require('https')
var apiUrl = 'https://api.t-fk.no/distance/'

function measureDistance (options, callback) {
  if (!options) {
    return callback(new Error('Missing required input: options'), null)
  }
  if (!options.origin) {
    return callback(new Error('Missing required input: options.origin'), null)
  }
  if (!options.destination) {
    return callback(new Error('Missing required input: options.destination'), null)
  }

  var body = ''
  var url = apiUrl + options.origin + '/' + options.destination

  https.get(url, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString()
    })

    res.on('end', function () {
      var json = JSON.parse(body)
      return callback(null, json)
    })
  }).on('error', function (error) {
    return callback(error, null)
  })
}

module.exports = measureDistance

