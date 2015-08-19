'use strict'

var assert = require('assert')
var checkOrigin = require('../lib/checkOrigin')

describe('checkOrigin', function () {

  it('it returns true if geocodedRegisteredAddress is from Telemark', function () {

    var item = require('./data/test_auto_yes_distance_gate.json')

    assert.equal(true, checkOrigin(item))

  })

  it('it returns true if registeredGnrBnrData is from Telemark', function () {

    var item = require('./data/fixdata_registered_gnr.json')

    assert.equal(true, checkOrigin(item))

  })

  it('it returns false if no item with correkt data is supplied', function () {

    var item = {}

    assert.equal(false, checkOrigin(item))

  })

})
