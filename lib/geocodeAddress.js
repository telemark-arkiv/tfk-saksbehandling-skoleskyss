'use strict'

function geocodeAddress (address, callback) {
  var https = require('https')
  var apiUrl = 'https://api.t-fk.no/geocode/'

  if (!address) {
    return callback(new Error('Missing required param: address'), null)
  }

  var body = ''
  var url = apiUrl + address

  https.get(url, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString()
    })

    res.on('end', function () {
      var json = JSON.parse(body)
      return callback(null, json.results[0])
    })
  }).on('error', function (error) {
    return callback(error, null)
  })
}

module.exports = geocodeAddress
