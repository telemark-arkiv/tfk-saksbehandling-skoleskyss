'use strict'

var assert = require('assert')
var fixAddressForMeasurement = require('../lib/fixAddressForMeasurement')

describe('fixAddressForMeasurement', function () {

  it('it requires an item object', function (done) {

    var item = false

    fixAddressForMeasurement(item, function (err, data) {
      assert.throws(function () {
          if (err) {
            throw err
          } else {
            console.log(data)
          }
        }, function (err) {
          if ((err instanceof Error) && /Missing required input: item object/.test(err)) {
            return true
          }
        },
        'Unexpected error'
      )
      done()
    })
  })

  it('it returns expected output from input', function (done) {

    var item = require('./data/fixdata_registered_gate.json')

    fixAddressForMeasurement(item, function (err, data) {
      if (err) {
        throw err
      } else {
        assert.deepEqual(data, item)
      }
      done()
    })
  })

  it('it returns expected output from input', function (done) {

    var item = require('./data/fixdata_registered_gate_alternative_gate.json')

    fixAddressForMeasurement(item, function (err, data) {
      if (err) {
        throw err
      } else {
        assert.deepEqual(data, item)
      }
      done()
    })
  })

  it('it returns expected output from input', function (done) {

    var item = require('./data/fixdata_registered_gnr.json')

    fixAddressForMeasurement(item, function (err, data) {
      if (err) {
        throw err
      } else {
        assert.deepEqual(data, item)
      }
      done()
    })
  })

  it('it returns expected output from input', function (done) {

    var item = require('./data/fixdata_registered_gnr_alternative_gate.json')

    fixAddressForMeasurement(item, function (err, data) {
      if (err) {
        throw err
      } else {
        assert.deepEqual(data, item)
      }
      done()
    })
  })

  it('it returns expected output from input', function (done) {

    var item = require('./data/fixdata_registered_gnr_alternative_gnr.json')

    fixAddressForMeasurement(item, function (err, data) {
      if (err) {
        throw err
      } else {
        assert.deepEqual(data, item)
      }
      done()
    })
  })

})
