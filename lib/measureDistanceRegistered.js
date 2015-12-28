'use strict'

var thru = require('thru')
var measureDistance = require('./measureDistance')
var VerboseLogger = require('./verboseLog')

var measureDistanceRegistered = thru(function (itemString, callback) {
  var item = JSON.parse(itemString)
  var verboseLog = new VerboseLogger(item.verboseLog)
  verboseLog.log('measureDistanceRegistered')
  var destination = item.schoolAddresseForMeasurement
  var origin = item.registeredAddressForMeasurement

  verboseLog.log('measureDistanceRegistered: starts')
  measureDistance({origin: origin, destination: destination}, function (error, distance) {
    verboseLog.log('measureDistanceRegistered: finished lookup')
    if (error) {
      item.errors.push({
        method: 'measureDistanceRegistered',
        error: error
      })
      verboseLog.log('measureDistanceRegistered: finished with error - ' + error)
      return callback(null, JSON.stringify(item))
    } else {
      if (distance.statusCode && parseInt(distance.statusCode, 10) === 500) {
        item.errors.push({
          method: 'measureDistanceRegistered',
          error: 'Distance could not be calculated'
        })
        verboseLog.log('measureDistanceRegistered: finished with error - Distance could not be calculated')
        return callback(null, JSON.stringify(item))
      } else {
        item.measuredDistanceRegisteredAddress = distance
        verboseLog.log('measureDistanceRegistered: finished just fine')
        return callback(null, JSON.stringify(item))
      }
    }
  })
})

module.exports = measureDistanceRegistered
