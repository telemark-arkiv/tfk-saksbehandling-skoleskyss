'use strict'

var assert = require('assert')
var getGnrBnrAddress = require('../lib/getGnrBnrAddress')

describe('getGnrBnrAddress', function () {
  it('it requires a querystring to exist', function (done) {
    var querystring = false

    getGnrBnrAddress(querystring, function (err, data) {
      assert.throws(function () {
        if (err) {
          throw err
        } else {
          console.log(data)
        }
      }, function (err) {
        if ((err instanceof Error) && /Missing required param: querystring/.test(err)) {
          return true
        }
      },
        'Unexpected error'
      )
      done()
    })
  })

  it('it returns data as expected', function (done) {
    var querystring = '0806-60/77'

    getGnrBnrAddress(querystring, function (err, data) {
      if (err) {
        throw err
      } else {
        assert.equal(data.geocoded.lat, 59.21585817)
        assert.equal(data.geocoded.lng, 9.61178004)
      }
      done()
    })
  })
})
