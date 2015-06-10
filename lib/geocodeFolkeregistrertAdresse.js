'use strict';

var thru = require('thru');
var geocodeAddress = require('./geocodeAddress');
var VerboseLogger = require('./verboseLog');

var geocodeFolkeregistrertAdresse = thru(function(itemString, callback){
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("geocodeFolkeregistrertAdresse");

  if (item.folkeregistrertAdresseAdresse !== '') {
    verboseLog.log("geocodeFolkeregistrertAdresse: starts");
    geocodeAddress(item.folkeregistrertAdresseAdresse, function(error, geocodedRegistered) {
      verboseLog.log("geocodeFolkeregistrertAdresse: finished lookup");
      if (error) {
        item.errors.push({
          method: 'geocodeFolkeregistrertAdresse',
          error: error
        });
        verboseLog.log("geocodeFolkeregistrertAdresse: finishes with error - " + error);
        return callback(null, JSON.stringify(item));
      } else {
        verboseLog.log("geocodeFolkeregistrertAdresse: finished. Everything looks fine");
        item.geocodedRegisteredAddress = geocodedRegistered;
        return callback(null, JSON.stringify(item));
      }
    });
  } else {
    verboseLog.log("geocodeFolkeregistrertAdresse: nothing to do");
    return callback(null, itemString)
  }
});

module.exports = geocodeFolkeregistrertAdresse;