'use strict';

var thru = require('thru');
var getGnrBnrAddress = require('./getGnrBnrAddress');
var VerboseLogger = require('./verboseLog');

var lookupSeeiendom = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("lookupSeeiendom");

  if (item.address) {
    verboseLog.log("lookupSeeiendom: starts");
    var query = item.address.street + ', ' + item.address.zip + ' ' + item.address.city;
    getGnrBnrAddress(query, function(error, data) {
      verboseLog.log("lookupSeeiendom: finished lookup");
      if(error) {
        item.errors.push({
          method: 'lookupSeeiendom',
          error: error
        });
        verboseLog.log("lookupSeeiendom: finished with error - " + error);
        return callback(null, JSON.stringify(item));
      } else {
        var lat = data.geocoded.lat;
        var lng = data.geocoded.lng;
        item.registeredAddressGeocoded = lng + ',' + lat;
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