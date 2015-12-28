'use strict'

var tap = require('tap')
var setBehandlingsType = require('../lib/setBehandlingsType')

tap.test('it requires an item object', function (test) {
  var item = false
  var expectedErrorMessage = 'Missing required input: item object'
  setBehandlingsType(item, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires item.sokegrunnlag to exists', function (test) {
  var item = {
    sokegrunnlag: false,
    personnummer: '01048900255'
  }
  var expectedErrorMessage = 'Missing required param: item.sokegrunnlag'
  setBehandlingsType(item, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it requires item.measuredDistanceRegisteredAddress to exists if sokegrunnlag is Avstand til skole', function (test) {
  var item = {
    sokegrunnlag: 'Avstand til skole',
    measuredDistanceRegisteredAddress: false,
    personnummer: '01048900255'
  }
  var expectedErrorMessage = 'Missing required param: item.measuredDistanceRegisteredAddress'
  setBehandlingsType(item, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('it sets item.behandlingsType to Automatic given distance as sokegrunnlag', function (test) {
  var item = require('./data/automatic_no_distance_long.json')
  setBehandlingsType(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.behandlingsType, 'Automatic')
    test.done()
  })
})

tap.test('it sets item.behandlingsType to Automatic given distance as sokegrunnlag', function (test) {
  var item = require('./data/automatic_no_distance_short.json')
  setBehandlingsType(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.behandlingsType, 'Automatic')
    test.done()
  })
})

tap.test('it sets item.behandlingsType to Automatic given boat as sokegrunnlag', function (test) {
  var item = require('./data/automatic_yes_boat.json')
  setBehandlingsType(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.behandlingsType, 'Automatic')
    test.done()
  })
})

tap.test('it sets item.behandlingsType to Automatic given distance as sokegrunnlag', function (test) {
  var item = require('./data/automatic_yes_distance.json')
  setBehandlingsType(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.behandlingsType, 'Automatic')
    test.done()
  })
})

tap.test('it sets item.behandlingsType to Manual given alternative address', function (test) {
  var item = require('./data/manual_alternative_address.json')
  setBehandlingsType(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.behandlingsType, 'Manual')
    test.done()
  })
})

tap.test('it sets item.behandlingsType to Manual given measured distance', function (test) {
  var item = require('./data/manual_distance.json')
  setBehandlingsType(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.behandlingsType, 'Manual')
    test.done()
  })
})

tap.test('it sets item.behandlingsType to Manual given Annet as sokegrunnlag', function (test) {
  var item = require('./data/manual_reason_other.json')
  setBehandlingsType(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.behandlingsType, 'Manual')
    test.done()
  })
})

tap.test('it sets item.behandlingsType to Manual given school outside county', function (test) {
  var item = require('./data/manual_school_outside_county.json')
  setBehandlingsType(item, function (error, data) {
    if (error) {
      throw error
    }
    tap.equal(data.behandlingsType, 'Manual')
    test.done()
  })
})
