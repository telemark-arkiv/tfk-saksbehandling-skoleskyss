'use strict';

var thru = require('thru');
var getGnrBnrAddress = require('./getGnrBnrAddress');
var VerboseLogger = require('./verboseLog');

var lookupSeeiendom = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("lookupSeeiendom");

  if (item.registeredAddress) {
    verboseLog.log("lookupSeeiendom: starts");
    var query = item.registeredAddress.street + ', ' + item.registeredAddress.zip + ' ' + item.registeredAddress.city;
    getGnrBnrAddress(query, function(error, data) {
      verboseLog.log("lookupSeeiendom: finished lookup");
      if (error) {
        item.errors.push({
          method: 'lookupSeeiendom',
          error: error
        });
        verboseLog.log("lookupSeeiendom: finished with error - " + error);
        item.registeredAddressGeocoded = query;
        return callback(null, JSON.stringify(item));
      } else {
        var lat = data.geocoded.lat;
        var lng = data.geocoded.lng;
        item.registeredAddressGeocoded = lat + ',' + lng;
        verboseLog.log("lookupSeeiendom: finished without errors");
        return callback(null, JSON.stringify(item));
      }
    });
  } else {
    verboseLog.log("lookupSeeiendom: no address found");
    return callback(null, itemString);
  }
});

module.exports = lookupSeeiendom;