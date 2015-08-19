'use strict'

var measureDistance = require('./measureDistance')

function setDistance (item, callback) {
  if (!item) {
    return callback(new Error('Missing required input: item object'), null)
  }
  if (!item.schoolAddresseForMeasurement) {
    return callback(new Error('Missing required input: item.schoolAddresseForMeasurement'), null)
  }
  if (!item.registeredAddressForMeasurement) {
    var errorMsg = new Error('Missing required input: item.registeredAddressForMeasurement')
    return callback(errorMsg, null)
  }
  var destination = item.schoolAddresseForMeasurement
  var origin = item.registeredAddressForMeasurement
  var originAlternative = item.alternativeAddressForMeasurement

  measureDistance({origin: origin, destination: destination}, function (error, data) {
    if (error) {
      return callback(error, null)
    } else {
      item.measuredDistanceRegisteredAddress = data

      if (originAlternative) {

        measureDistance({origin: originAlternative, destination: destination}, function (err, distance) {
          if (err) {
            return callback(err)
          } else {
            item.measuredDistanceAlternativeAddress = distance
            return callback(null, item)
          }
        })

      } else {
        return callback(null, item)
      }

    }
  })

}

module.exports = setDistance
