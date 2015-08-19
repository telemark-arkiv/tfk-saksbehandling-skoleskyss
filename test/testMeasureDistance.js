'use strict'

var assert = require('assert')
var measureDistance = require('../lib/measureDistance')

describe('measureDistance', function () {

  it('it requires an options object', function (done) {

    var options = false

    measureDistance(options, function (err, data) {
      assert.throws(function () {
          if (err) {
            throw err
          } else {
            console.log(data)
          }
        }, function (err) {
          if ((err instanceof Error) && /Missing required input: options/.test(err)) {
            return true
          }
        },
        'Unexpected error'
      )
      done()
    })
  })

  it('it requires options.origin to exists', function (done) {

    var options = {
      origin: false
    }

    measureDistance(options, function (err, data) {
      assert.throws(function () {
          if (err) {
            throw err
          } else {
            console.log(data)
          }
        }, function (err) {
          if ((err instanceof Error) && /Missing required input: options.origin/.test(err)) {
            return true
          }
        },
        'Unexpected error'
      )
      done()
    })
  })

  it('it requires options.destination to exists', function (done) {

    var options = {
      origin: true,
      destination: false
    }

    measureDistance(options, function (err, data) {
      assert.throws(function () {
          if (err) {
            throw err
          } else {
            console.log(data)
          }
        }, function (err) {
          if ((err instanceof Error) && /Missing required input: options.destination/.test(err)) {
            return true
          }
        },
        'Unexpected error'
      )
      done()
    })
  })

  it('it measures the walking distance', function (done) {

    var options = {
      origin: 'Lisleherad skole, 3680 Notodden',
      destination: 'Kjærlighetsstien 24, Notodden'
    }

    measureDistance(options, function (err, data) {
      if (err) {
        console.error(err)
      } else {
        assert.equal(data.distanceValue, 6464)
      }
      done()
    })
  })

})
