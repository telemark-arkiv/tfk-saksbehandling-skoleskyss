'use strict';

var thru = require('thru');
var measureDistance = require('./measureDistance');
var verboseLog = require('./verboseLog');

var measureDistanceRegistered = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  verboseLog(item.verboseLog, "measureDistanceRegistered");
  var destination = item.schoolAddresseForMeasurement;
  var origin = item.registeredAddressForMeasurement;

  verboseLog(item.verboseLog, "measureDistanceRegistered: starts");
  measureDistance({origin: origin, destination:destination}, function(error, distance) {
    verboseLog(item.verboseLog, "measureDistanceRegistered: finished");
    if (error) {
      item.errors.push({
        method: 'measureDistanceRegistered',
        error: error
      });
      return callback(null, JSON.stringify(item));
    } else {
      if (distance.statusCode && parseInt(distance.statusCode, 10 ) === 500) {
        item.errors.push({
          method: 'measureDistanceRegistered',
          error: "Distance could not be calculated"
        });
        return callback(null, JSON.stringify(item));
      } else {
        item.measuredDistanceRegisteredAddress = distance;
        return callback(null, JSON.stringify(item));
      }
    }
  });

});

module.exports = measureDistanceRegistered;