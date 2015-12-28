'use strict'

var tap = require('tap')
var geocodeAddress = require('../lib/geocodeAddress')

tap.test('it requires an address to exist', function (test) {
  var address = false
  var expectedErrorMessage = 'Missing required param: address'
  geocodeAddress(address, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it returns data as expected', function (test) {
  var address = 'Kjærlighetsstien 24, 3681 Notodden'
  var result = require('./data/geocoded_address.json')
  geocodeAddress(address, function (error, data) {
    if (error) {
      throw error
    }
    tap.deepEqual(data, result)
    test.done()
  })
})
