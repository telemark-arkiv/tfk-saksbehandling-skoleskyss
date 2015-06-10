'use strict';

var thru = require('thru');
var geocodeAddress = require('./geocodeAddress');
var verboseLog = require('./verboseLog');

var geocodeFolkeregistrertAdresse = thru(function(itemString, callback){
  var item = JSON.parse(itemString);
  verboseLog(item.verboseLog, "geocodeFolkeregistrertAdresse");

  if (item.folkeregistrertAdresseAdresse !== '') {
    verboseLog(item.verboseLog, "geocodeFolkeregistrertAdresse: starts");
    geocodeAddress(item.folkeregistrertAdresseAdresse, function(error, geocodedRegistered) {
      verboseLog(item.verboseLog, "geocodeFolkeregistrertAdresse: finished");
      if (error) {
        item.errors.push({
          method: 'geocodeFolkeregistrertAdresse',
          error: error
        });
        return callback(null, JSON.stringify(item));
      } else {
        item.geocodedRegisteredAddress = geocodedRegistered;
        return callback(null, JSON.stringify(item));
      }
    });
  } else {
    verboseLog(item.verboseLog, "geocodeFolkeregistrertAdresse: nothing to do");
    return callback(null, itemString)
  }
});

module.exports = geocodeFolkeregistrertAdresse;