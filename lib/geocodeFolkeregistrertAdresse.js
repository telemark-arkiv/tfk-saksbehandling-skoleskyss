'use strict';

var thru = require('thru');
var geocodeAddress = require('./geocodeAddress');

var geocodeFolkeregistrertAdresse = thru(function(itemString, callback){
  var item = JSON.parse(itemString);

  if (item.folkeregistrertAdresseAdresse !== '') {
    geocodeAddress(item.folkeregistrertAdresseAdresse, function(error, geocodedRegistered) {
      if (error) {
        item.errors.push({
          method: 'geocodeFolkeregistrertAdresse',
          error: error
        });
        return callback(null, itemString);
      } else {
        if (geocodedRegistered.status !== 'OK') {
          item.errors.push({
            method: 'geocodeFolkeregistrertAdresse',
            error: "Address not found"
          });
        } else {
          item.geocodedRegisteredAddress = geocodedRegistered;
          return callback(null, JSON.stringify(item));
        }
      }
    });
  } else {
    return callback(null, itemString)
  }
});

module.exports = geocodeFolkeregistrertAdresse;