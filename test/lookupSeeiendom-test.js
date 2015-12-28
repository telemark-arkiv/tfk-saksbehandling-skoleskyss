'use strict'

var assert = require('assert')
var thru = require('thru')
var pipeline = thru()
var lookupSeeiendom = require('../lib/lookupSeeiendom')
var testData = require('./data/lookupSeeiendom-testdata.json')

describe('lookupSeeiendom', function () {
  it('it returns expected result', function (done) {
    var testResult = thru(function (itemString, callback) {
      var item = JSON.parse(itemString)
      assert.equal(item.registeredAddressGeocoded, testData.expectedResult)
      done()
      return callback(null, 'Success')
    })

    pipeline
      .pipe(lookupSeeiendom)
      .pipe(testResult)

    pipeline.write(JSON.stringify(testData.item))
  })
})
