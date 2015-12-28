'use strict'

var tap = require('tap')
var thru = require('thru')
var pipeline = thru()
var lookupSeeiendom = require('../lib/lookupSeeiendom')
var testData = require('./data/lookupSeeiendom-testdata.json')

tap.test('it returns expected result', function (test) {
  var testResult = thru(function (itemString, callback) {
    var item = JSON.parse(itemString)
    tap.equal(item.registeredAddressGeocoded, testData.expectedResult, 'expected result returned')
    test.done()
    return callback(null, 'Success')
  })

  pipeline
    .pipe(lookupSeeiendom)
    .pipe(testResult)

  pipeline.write(JSON.stringify(testData.item))
})
