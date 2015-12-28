'use strict'

var tap = require('tap')
var fixAddressForMeasurement = require('../lib/fixAddressForMeasurement')

tap.test('it requires an item object', function (test) {
  var item = false
  var expectedErrorMessage = 'Missing required input: item object'
  fixAddressForMeasurement(item, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it returns expected output from input', function (test) {
  var item = require('./data/fixdata_registered_gate.json')
  fixAddressForMeasurement(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.deepEqual(data, item)
    test.done()
  })
})

tap.test('it returns expected output from input', function (test) {
  var item = require('./data/fixdata_registered_gate_alternative_gate.json')
  fixAddressForMeasurement(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.deepEqual(data, item)
    test.done()
  })
})

tap.test('it returns expected output from input', function (test) {
  var item = require('./data/fixdata_registered_gnr.json')
  fixAddressForMeasurement(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.deepEqual(data, item)
    test.done()
  })
})

tap.test('it returns expected output from input', function (test) {
  var item = require('./data/fixdata_registered_gnr_alternative_gate.json')
  fixAddressForMeasurement(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.deepEqual(data, item)
    test.done()
  })
})

tap.test('it returns expected output from input', function (test) {
  var item = require('./data/fixdata_registered_gnr_alternative_gnr.json')
  fixAddressForMeasurement(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.deepEqual(data, item)
    test.done()
  })
})
