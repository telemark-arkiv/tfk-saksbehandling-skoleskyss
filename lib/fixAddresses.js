'use strict';

function fixAddresses(item, callback){
  var geocodeAddress = require('./geocodeAddress');
  var fixAddressMeasureDistance = require('./fixAddressMeasureDistance');

  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }

  if (item.folkeregistrertAdresseAdresse !== '') {
    geocodeAddress(item.folkeregistrertAdresseAdresse, function(error, geocodedRegistered){
      if (error) {
        return callback(error, null);
      } else {
        item.geocodedRegisteredAddress = geocodedRegistered;
        if (item.alternativAdresseAdresse !== '') {
          geocodeAddress(item.alternativAdresseAdresse, function(err, geocodedAlternative){
            if (err) {
              return callback(err, null);
            } else {
              item.geocodedAlternativeAddress = geocodedAlternative;
              fixAddressMeasureDistance(item, function(er, data){
                if(er){
                  return callback(er, null);
                } else {
                  return callback(null, data);
                }
              });
            }
          });
        } else {
          item.geocodedAlternativeAddress = '';
          fixAddressMeasureDistance(item, function(er, data){
            if(er){
              return callback(er, null);
            } else {
              return callback(null, data);
            }
          });
        }
      }
    });
  } else {
    item.geocodedRegisteredAddress = '';
    if (item.alternativAdresseAdresse !== '') {
      geocodeAddress(item.alternativAdresseAdresse, function(err, geocodedAlternative){
        if (err) {
          return callback(err, null);
        } else {
          item.geocodedAlternativeAddress = geocodedAlternative;
          fixAddressMeasureDistance(item, function(er, data){
            if(er){
              return callback(er, null);
            } else {
              return callback(null, data);
            }
          });
        }
      });
    } else {
      item.geocodedAlternativeAddress = '';
      fixAddressMeasureDistance(item, function(er, data){
        if(er){
          return callback(er, null);
        } else {
          return callback(null, data);
        }
      });
    }
  }

}

module.exports = fixAddresses;