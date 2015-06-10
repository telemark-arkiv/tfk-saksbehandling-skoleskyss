'use strict';

var thru = require('thru');
var measureDistance = require('./measureDistance');
var VerboseLogger = require('./verboseLog');

var measureDistanceAlternative = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("measureDistanceAlternative");
  var destination = item.schoolAddresseForMeasurement;
  var origin = item.alternativeAddressForMeasurement;

  if (origin && origin !== '') {
    verboseLog.log("measureDistanceAlternative: starts");
    measureDistance({origin: origin, destination:destination}, function(error, distance) {
      verboseLog.log("measureDistanceAlternative: finished");
      if (error) {
        item.errors.push({
          method: 'measureDistanceAlternative',
          error: error
        });
        verboseLog.log("measureDistanceAlternative: finished with error - " + error);
        return callback(null, JSON.stringify(item));
      } else {
        if (distance.statusCode && parseInt(distance.statusCode, 10 ) === 500) {
          item.errors.push({
            method: 'measureDistanceAlternative',
            error: "Distance could not be calculated"
          });
          verboseLog.log("measureDistanceAlternative: finished with error - Distance could not be calculated");
          return callback(null, JSON.stringify(item));
        } else {
          item.measuredDistanceAlternativeAddress = distance;
          verboseLog.log("measureDistanceAlternative: finished with success");
          return callback(null, JSON.stringify(item));
        }
      }
    });
  } else {
    verboseLog.log("measureDistanceAlternative: nothing to do");
    return callback(null, itemString);
  }

});

module.exports = measureDistanceAlternative;