'use strict';

var thru = require('thru');
var measureDistance = require('./measureDistance');
var measureDistanceRegistered = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var destination = item.schoolAddresseForMeasurement;
  var origin = item.registeredAddressForMeasurement;

  measureDistance({origin: origin, destination:destination}, function(error, distance) {
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