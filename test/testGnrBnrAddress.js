'use strict'

var tap = require('tap')
var getGnrBnrAddress = require('../lib/getGnrBnrAddress')

tap.test('it requires a querystring to exist', function (test) {
  var querystring = false
  var expectedErrorMessage = 'Missing required param: querystring'
  getGnrBnrAddress(querystring, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it returns data as expected', function (test) {
  var querystring = '0806-60/77'
  getGnrBnrAddress(querystring, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.geocoded.lat, 59.21585817, 'lat OK')
    tap.equal(data.geocoded.lng, 9.61178004, 'lng OK')
    test.done()
  })
})
