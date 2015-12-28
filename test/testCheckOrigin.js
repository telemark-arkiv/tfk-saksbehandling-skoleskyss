'use strict'

var tap = require('tap')
var checkOrigin = require('../lib/checkOrigin')

tap.test('it returns true if geocodedRegisteredAddress is from Telemark', function (test) {
  var item = require('./data/test_auto_yes_distance_gate.json')
  tap.equal(true, checkOrigin(item), 'true')
  test.done()
})

tap.test('it returns true if registeredGnrBnrData is from Telemark', function (test) {
  var item = require('./data/fixdata_registered_gnr.json')
  tap.equal(true, checkOrigin(item), 'true')
  test.done()
})

tap.test('it returns false if no item with correkt data is supplied', function (test) {
  var item = {}
  tap.equal(false, checkOrigin(item), 'false')
  test.done()
})
