'use strict'

var assert = require('assert')
var geocodeAddress = require('../lib/geocodeAddress')

describe('geocodeAddress', function () {

  it('it requires an address to exist', function (done) {

    var address = false

    geocodeAddress(address, function (err, data) {
      assert.throws(function () {
          if (err) {
            throw err
          } else {
            console.log(data)
          }
        }, function (err) {
          if ((err instanceof Error) && /Missing required param: address/.test(err)) {
            return true
          }
        },
        'Unexpected error'
      )
      done()
    })
  })

  it('it returns data as expected', function (done) {

    var address = 'Kjærlighetsstien 24, 3681 Notodden'
    var result = require('./data/geocoded_address.json')

    geocodeAddress(address, function (err, data) {
      if (err) {
        throw err
      } else {
        assert.deepEqual(data, result)
      }
      done()
    })
  })

})
