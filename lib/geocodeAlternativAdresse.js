'use strict';

var thru = require('thru');
var geocodeAddress = require('./geocodeAddress');

var geocodeAlternativeAdresse = thru(function(itemString, callback){
  var item = JSON.parse(itemString);

  if (item.alternativAdresseAdresse !== '') {
    geocodeAddress(item.alternativAdresseAdresse, function(error, geocodedAlternative) {
      if (error) {
        item.errors.push({
          method: 'geocodeAlternativAdresse',
          error: error
        });
        return callback(null, itemString);
      } else {

        if (geocodedRegistered.statusCode && parseInt(geocodedRegistered.statusCode, 10) === 500) {
          item.errors.push({
            method: 'geocodedAlternativeAddress',
            error: "Address not found"
          });
        } else {
          item.geocodedAlternativeAddress = geocodedRegistered;
          return callback(null, JSON.stringify(item));
        }
      }
    });
  } else {
    return callback(null, itemString)
  }
});

module.exports = geocodeAlternativeAdresse;