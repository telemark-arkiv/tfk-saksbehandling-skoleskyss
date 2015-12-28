'use strict'

var tap = require('tap')
var setDistance = require('../lib/setDistance')

tap.test('it requires an item object', function (test) {
  var item = false
  var expectedErrorMessage = 'Missing required input: item object'
  setDistance(item, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires item.schoolAddresseForMeasurement to exist', function (test) {
  var item = {
    schoolAddresseForMeasurement: false
  }
  var expectedErrorMessage = 'Missing required input: item.schoolAddresseForMeasurement'
  setDistance(item, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires item.registeredAddressForMeasurement to exist', function (test) {
  var item = {
    schoolAddresseForMeasurement: true,
    registeredAddressForMeasurement: false
  }
  var expectedErrorMessage = 'Missing required input: item.registeredAddressForMeasurement'
  setDistance(item, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it measures the walking distance from registered address', function (test) {
  var item = require('./data/automatic_yes_distance.json')
  item.schoolAddresseForMeasurement = item.skoleAdresse
  item.registeredAddressForMeasurement = item.folkeregistrertAdresseAdresse
  setDistance(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.measuredDistanceRegisteredAddress.distanceValue, item.measuredDistanceRegisteredAddress.distanceValue)
    test.done()
  })
})
