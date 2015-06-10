'use strict';

var thru = require('thru');
var getGnrBnrAddress = require('./getGnrBnrAddress');
var verboseLog = require('./verboseLog');

var lookupGnrBnrAlternative = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  verboseLog(item.verboseLog, "lookupGnrBnrAleternative");

  if (item.alternativAdresseBosted === 'GnrBnr') {
    verboseLog(item.verboseLog, "lookupGnrBnrAleternative: starts");
    var kommune = item.alternativAdresseKommunenr;
    var gnr = item.alternativAdresseGnr;
    var bnr = item.alternativAdresseBnr;
    var query =  kommune + '-' + gnr + '/' + bnr;
    getGnrBnrAddress(query, function(error, data){
      verboseLog(item.verboseLog, "lookupGnrBnrAleternative: finished");
      if(error) {
        item.errors.push({
          method: 'lookupGnrBnrAlternative',
          error: error
        });
        return callback(null, JSON.stringify(item));
      } else {
        var lat = data.geocoded.lat;
        var lng = data.geocoded.lng;
        item.alternativeGnrBnrData = data;
        item.alternativeAddressForMeasurement = lat + ',' + lng;
        return callback(null, JSON.stringify(item));
      }
    });
  } else {
    verboseLog(item.verboseLog, "lookupGnrBnrAleternative: nothing to do");
    return callback(null, itemString);
  }
});

module.exports = lookupGnrBnrAlternative;