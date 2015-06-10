'use strict';

var thru = require('thru');
var measureDistance = require('./measureDistance');
var verboseLog = require('./verboseLog');

var measureDistanceAlternative = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  verboseLog(item.verboseLog, "measureDistanceAlternative");
  var destination = item.schoolAddresseForMeasurement;
  var origin = item.alternativeAddressForMeasurement;

  if (origin && origin !== '') {
    verboseLog(item.verboseLog, "measureDistanceAlternative: starts");
    measureDistance({origin: origin, destination:destination}, function(error, distance) {
      verboseLog(item.verboseLog, "measureDistanceAlternative: finished");
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
    verboseLog(item.verboseLog, "measureDistanceAlternative: nothing to do");
    return callback(null, itemString);
  }

});

module.exports = measureDistanceAlternative;