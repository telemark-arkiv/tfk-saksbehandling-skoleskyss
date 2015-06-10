'use strict';

var thru = require('thru');
var getGnrBnrAddress = require('./getGnrBnrAddress');
var verboseLog = require('./verboseLog');

var lookupGnrBnrFolkeregistrert = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  verboseLog(item.verboseLog, "lookupGnrBnrFolkeregistrertAdresse");

  if (item.folkeregistrertAdresseBosted === 'GnrBnr') {
    verboseLog(item.verboseLog, "lookupGnrBnrFolkeregistrertAdresse: starts");
    var kommune = item.folkeregistrertAdresseKommunenr;
    var gnr = item.folkeregistrertAdresseGnr;
    var bnr = item.folkeregistrertAdresseBnr;
    var query =  kommune + '-' + gnr + '/' + bnr;
    getGnrBnrAddress(query, function(error, data){
      verboseLog(item.verboseLog, "lookupGnrBnrFolkeregistrertAdresse: finished");
      if(error) {
        item.errors.push({
          method: 'lookupGnrBnrFolkeregistrert',
          error: error
        });
        return callback(null, JSON.stringify(item));
      } else {
        var lat = data.geocoded.lat;
        var lng = data.geocoded.lng;
        item.registeredGnrBnrData = data;
        item.registeredAddressForMeasurement = lat + ',' + lng;
        return callback(null, JSON.stringify(item));
      }
    });
  } else {
    verboseLog(item.verboseLog, "lookupGnrBnrFolkeregistrertAdresse: nothing to do");
    return callback(null, itemString);
  }
});

module.exports = lookupGnrBnrFolkeregistrert;