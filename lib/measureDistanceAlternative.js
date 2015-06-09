'use strict';

var thru = require('thru');
var measureDistance = require('./measureDistance');
var measureDistanceAlternative = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var destination = item.schoolAddresseForMeasurement;
  var origin = item.alternativeAddressForMeasurement;

  if (origin && origin !== '') {
    measureDistance({origin: origin, destination:destination}, function(error, distance) {
      if (error) {
        item.errors.push({
          method: 'measureDistanceAlternative',
          error: error
        });
        return callback(null, JSON.stringify(item));
      } else {
        if (distance.statusCode && parseInt(distance.statusCode, 10 ) === 500) {
          item.errors.push({
            method: 'measureDistanceAlternative',
            error: "Distance could not be calculated"
          });
          return callback(null, JSON.stringify(item));
        } else {
          item.measuredDistanceAlternativeAddress = distance;
          return callback(null, JSON.stringify(item));
        }
      }
    });
  } else {
    return callback(null, itemString);
  }

});

module.exports = measureDistanceAlternative;