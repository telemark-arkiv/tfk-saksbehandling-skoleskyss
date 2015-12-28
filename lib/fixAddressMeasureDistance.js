'use strict'

function fixAddressMeasureDistance (item, callback) {
  var fixAddressForMeasurement = require('./fixAddressForMeasurement')
  var setDistance = require('./setDistance')

  if (!item) {
    return callback(new Error('Missing required input: item object'), null)
  }

  fixAddressForMeasurement(item, function (error, data) {
    if (error) {
      return callback(error, null)
    } else {
      setDistance(data, function (err, result) {
        if (err) {
          return callback(err, null)
        } else {
          return callback(null, result)
        }
      })
    }
  })
}

module.exports = fixAddressMeasureDistance
