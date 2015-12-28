'use strict'

var tap = require('tap')
var measureDistance = require('../lib/measureDistance')

tap.test('it requires an options object', function (test) {
  var options = false
  var expectedErrorMessage = 'Missing required input: options'
  measureDistance(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.origin to exists', function (test) {
  var options = {
    origin: false
  }
  var expectedErrorMessage = 'Missing required input: options.origin'
  measureDistance(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires options.destination to exists', function (test) {
  var options = {
    origin: true,
    destination: false
  }
  var expectedErrorMessage = 'Missing required input: options.destination'
  measureDistance(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it measures the walking distance', function (test) {
  var options = {
    origin: 'Bjarne Hansens vei 22, 3680 Notodden',
    destination: 'Kjærlighetsstien 24, 3681 Notodden'
  }
  measureDistance(options, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.distanceValue, 6051, 'Length 6051')
    test.done()
  })
})
